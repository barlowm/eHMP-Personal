define([
    "backbone",
    "jquery",
    "api/Messaging"
], function(Backbone, $, Messaging) {
    'use strict';

    var infoButtonUtils = {};

    function getAge(dob, sourceFormat) {

        if ($.isPlainObject(sourceFormat)) {
            sourceFormat = "YYYYMMDDHHmmssSSS";
        }

        if (dob) {
            var dobString = moment(dob, sourceFormat);
            return moment().diff(dobString, 'years');
        } else {
            return '';
        }

    }

    function getParams(info) {

        // mainSearchCriteria
        // taskContext
        // subTopic
        // age
        // ageGroup
        // administrativeGenderCode
        // informationRecipient
        // performer
        // encounter

        //Task context - taskContext.c.c - value list:
        // PROBLISTREV    - Problem list review (DEFAULT)
        // OE             - laboratory test order entry
        // LABOE          - laboratory test order entry
        // MEDOE          - medication order entry
        // PATDOC         - patient documentation
        // CLINNOTEE      - clinical note entry
        // DIAGLISTE      - diagnosis list entry
        // DISCHSUME      - discharge summary entry
        // PATREPE        - pathology report entry
        // PROBLISTE      - problem list entry
        // RADREPE        - radiology report entry
        // PATINFO        - patient information review
        // CLINNOTEREV    - clinical note review
        // DISCHSUMREV    - discharge summary review
        // DIAGLISTREV    - diagnosis list review
        // LABRREV        - Laboratory results!!!!!!
        // MICRORREV      - microbiology results review
        // MICROORGRREV   - microbiology organisms results review
        // MICROSENSRREV  - microbiology sensitivity test results review
        // MLREV          - Medication list!!!!
        // MARWLREV       - medication administration record work list review
        // OREV           - orders review
        // PATREPREV      - pathology report review
        // RADREPREV      - radiology report review
        // RISKASSESS     - risk assessment instrument
        // FALLRISK       - falls risk assessment instrument


        var params = {};

        params.mainSearchCriteria = {};

        var session = ADK.UserService.getUserSession();
        var oid = session.get("infobutton-oid");
        params.oid = oid ? oid : '1.3.6.1.4.1.3768';

        var qualifiedName = info.model.get('qualifiedName');
        if (qualifiedName) {
            params.mainSearchCriteria.Dn = qualifiedName;
        } else {
            var problemText = info.model.get('problemText');
            if (problemText) {
                params.mainSearchCriteria.Dn = problemText;
            } else {
                var subKind = info.model.get('subKind');
                if (subKind) {
                    params.mainSearchCriteria.Dn = subKind;
                } else {
                    var normalizedName = info.model.get('normalizedName');
                    if (normalizedName) {
                        params.mainSearchCriteria.Dn = normalizedName;
                    } else {
                        params.mainSearchCriteria.Dn = info.model.get('displayName');
                    }
                }
            }
        }

        params.taskContext = info.model.get('infobuttonContext');

        if (!params.taskContext) {
            params.taskContext = 'PROBLISTREV';
        }

        params.age = getAge(info.patient.get('birthDate'), 'YYYYMMDD');

        var genderCode = info.patient.get('genderCode');
        if (genderCode) {
            if (genderCode.length > 2) {
                var genderParts = genderCode.split(':');
                params.gender = genderParts[genderParts.length - 1];
            }
        }

        params.performer = 'PROV';

        params.informationRecipient = 'PROV';

        params.xsltTransform = 'Infobutton_UI_VA'; //???

        return params;
    }

    function buildUrlParams(params) {
        var urlParams = '';

        if (!params)
            return urlParams;

        if (params.oid)
            urlParams += '&representedOrganization.id.root=' + params.oid;

        if (params.gender)
            urlParams += '&patientPerson.administrativeGenderCode.c=' + params.gender;

        if (params.age)
            urlParams += '&age.v.v=' + params.age + '&age.v.u=a';

        //mandatory
        urlParams += '&taskContext.c.c=' + params.taskContext;

        if (params.mainSearchCriteria) {
            if (params.mainSearchCriteria.Code)
                urlParams += '&mainSearchCriteria.v.c=' + params.mainSearchCriteria.Code;
            if (params.mainSearchCriteria.Cs)
                urlParams += '&mainSearchCriteria.v.cs=' + params.mainSearchCriteria.Cs;
            if (params.mainSearchCriteria.Dn)
                urlParams += '&mainSearchCriteria.v.dn=' + params.mainSearchCriteria.Dn;
        }

        if (params.performer)
            urlParams += '&performer=' + params.performer;

        if (params.informationRecipient)
            urlParams += '&informationRecipient=' + params.informationRecipient;

        if (params.xsltTransform)
            urlParams += '&xsltTransform=Infobutton_UI_VA';

        //cut the first &
        if (urlParams.substring(0, 1) === '&')
            urlParams = urlParams.substring(1);

        return urlParams;
    }

    infoButtonUtils.callProvider = function(info) {
        var session = ADK.UserService.getUserSession();

        var baseUrl = session.get('infobutton-site');

        var params = getParams(info);

        var urlParams = buildUrlParams(params);

        var url = baseUrl + urlParams;

        var winRef = window.open(url, 'infoButtonUniqueWindow', 'width=970, height=670, status=no, location=no, toolbar=no, scrollbars=no, resizable=yes');
    };

    //!!!!!!
    var infoButtonTemplate = '<div class="appletToolbar" id="info-button-template"><div class="toolbarPopover"><div class="btn-toolbar" role="toolbar" ><div class="btn-group" role="group"><a tooltip-data-key="toolbar_infobutton" class="btn" id="info-button"><i class="fa fa-info"></i></a><a tooltip-data-key="toolbar_detailview" class="btn" id="info-button-sidekick-detailView"><i class="fa fa-file-text-o"></i></a><a tooltip-data-key="toolbar_addimmunizations" class="btn" id="info-button-sidekick-add"><i class="fa fa-plus"></i></a></div></div></div></div>';

    function getInfoButtonUIUnit() {
        return $('body').find('#info-button-template');
    }

    function initInfoButtonUIunit() {

        var options = gridClickInfo.that.options,
            that = gridClickInfo.that,
            template = infoButtonTemplate,
            uiEl = getInfoButtonUIUnit();

        if (uiEl.length !== 0) {
            uiEl.find('[data-toggle=tooltip]').tooltip('destroy');
            uiEl.remove();
        }

        if (options.toolbarOptions) {
            var tblOpts,
                submenuItems,
                submenuTitle;

            uiEl = $(template);

            if (options.showLinksButton) {
                submenuItems = [];
                submenuTitle = 'Select Associated Workspace';
                if (!_.isUndefined($(event.target).closest("tr").data('model').get('snomedCode'))) {
                    ADK.UserDefinedScreens.getScreenBySnomedCt($(event.target).closest("tr").data('model').get('snomedCode')).done(function(filteredScreenList) {
                        if (filteredScreenList.length > 0) {
                            _.each(filteredScreenList, function(filteredScreen) {
                                var scrnObj = {
                                    displayText: filteredScreen.title,
                                    url: ('#' + filteredScreen.routeName)
                                };
                                submenuItems.push(scrnObj);
                            });
                        }
                    });
                }
                template = '<div class="appletToolbar" id="info-button-template"><div class="toolbarPopover"><div class="btn-toolbar" role="toolbar" ><div class="btn-group" role="group"><a tooltip-data-key="toolbar_infobutton" class="btn" id="info-button"><i class="fa fa-info"></i></a><a tooltip-data-key="toolbar_detailview" class="btn" id="info-button-sidekick-detailView"><i class="fa fa-file-text-o"></i></a><div class="btn-group dropdown"><div class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a tooltip-data-key="submenu_detailview" class="btn" id="submenu-button-sidekick-detailView"><i class="fa fa-tags"></i></a></div><ul class="dropdown-menu"></ul></div></div></div>';
                uiEl = $(template);
                if (submenuItems.length === 0) {
                    uiEl.find('.dropdown').replaceWith('<a tooltip-data-key="submenu_detailview" class="btn" id="submenu-button-sidekick-detailView" disabled="disabled"><i class="fa fa-tags"></i></a>');
                } else if (submenuItems.length === 1) {
                    uiEl.find('.dropdown').replaceWith('<a tooltip-data-key="submenu_detailview" class="btn" id="submenu-button-sidekick-detailView" href="' + submenuItems[0].url + '"><i class="fa fa-tags"></i></a>');
                } else {
                    uiEl.find('ul').append('<li class="appletToolbar-submenu-title">' + submenuTitle + '</li>');
                    _.each(submenuItems, function(item) {
                        uiEl.find('ul').append('<li><a href=' + item.url + '>' + item.displayText + '</a</li>');
                    });
                }
            }
        } else {
            uiEl = $(infoButtonTemplate);
        }

        $('#center-region').append(uiEl);

        $('body').off('click.infobutton.info').off('click.infobutton.detail').off('click.infobutton.add');
        $('body').on('click.infobutton.info', '#info-button', processInfoButton);
        $('body').on('click.infobutton.detail', '#info-button-sidekick-detailView', processDetailView);
        $('body').on('click.infobutton.add', '#info-button-sidekick-add', processAddView);


        return uiEl;
    }

    function processDetailView(event) {

        var uiEl = getInfoButtonUIUnit();

        if (gridClickInfo.baseClickFunc) {
            gridClickInfo.baseClickFunc(gridClickInfo.that, gridClickInfo.event);
        }

        clearInterval(observeScroll.timer);
        uiEl.hide();

        return false;
    }

    function processAddView(event) {

        var uiEl = getInfoButtonUIUnit();

        var appletId = gridClickInfo.that.AppletID;
        if (_.isUndefined(appletId))
            appletId = gridClickInfo.that.appletConfig.id;

        Messaging.getChannel(appletId).trigger('addView');

        clearInterval(observeScroll.timer);
        uiEl.hide();

        return false;
    }

    function processInfoButton(event) {

        var info = {};
        var myModel = new Backbone.Model();
        var uiEl = getInfoButtonUIUnit();
        myModel.set('qualifiedName', uiEl.data('concept-name'));
        myModel.set('infobuttonContext', uiEl.data('concept-context'));
        info.model = myModel;
        info.patient = ADK.ResourceService.patientRecordService.getCurrentPatient();

        infoButtonUtils.callProvider(info);

        clearInterval(observeScroll.timer);
        uiEl.hide();

        return false;
    }

    var iParent = null;
    var observeScroll = {
        timer: null,
        top: -1,
        left: -1
    };

    function checkParentPosition() {
        if (!iParent || !observeScroll.timer)
            return;

        if (!iParent.offset()) {
            return;
        }

        if (iParent.offset().top != observeScroll.top || iParent.offset().left != observeScroll.left) {
            var uiEl = getInfoButtonUIUnit();
            clearInterval(observeScroll.timer);
            uiEl.hide();
        }
    }

    infoButtonUtils.showInfoButton = function(event) {

        clearInterval(observeScroll.timer);

        var eventTarget = $(event.target);
        if (!eventTarget.attr('data-infobutton')) {
            eventTarget = eventTarget.closest('[data-infobutton]');
        }
        if (eventTarget.length === 0) {
            gridClickInfo.baseClickFunc(gridClickInfo.that, gridClickInfo.event);
            return;
        }

        var model = eventTarget.data('model');
        var context = null;
        if (model) {
            context = model.get('infobuttonContext');
        }

        var uiEl = initInfoButtonUIunit();

        uiEl.data('concept-name', eventTarget.data('infobutton'));
        //var context = eventTarget.data('infobuttonContext');
        if (!context) {
            context = 'PROBLISTREV';
        }
        uiEl.data('concept-context', context);
        iParent = eventTarget;

        var myCss = {
            position: 'absolute',
            left: eventTarget.offset().left,
            top: eventTarget.offset().top,
            zIndex: 1000
        };
        if (eventTarget.parents('#mainModalDialog').length !== 0) {
            myCss.zIndex = 5000;
        }

        var appletId = gridClickInfo.that.AppletID;
        if (_.isUndefined(appletId) && !_.isUndefined(gridClickInfo.that.appletConfig)) {
            appletId = gridClickInfo.that.appletConfig.id;
        }

        if (_.isUndefined(appletId) || (!_.isUndefined(appletId) && appletId.toLowerCase() != 'immunizations') ||
            !ADK.PatientRecordService.isPatientInPrimaryVista() || !ADK.UserService.hasPermission('add-patient-immunization')) {
            uiEl.find('#info-button-sidekick-add').hide();
        } else {
            uiEl.find('#info-button-sidekick-add').show();
        }

        uiEl.show().css(myCss);

        observeScroll.top = iParent.offset().top;
        observeScroll.left = iParent.offset().left;
        observeScroll.timer = setInterval(checkParentPosition, 100);

        return false;
    };


    infoButtonUtils.hideInfoButton = function(event) {
        var uiEl = getInfoButtonUIUnit();
        if (!uiEl.is(':visible') || !iParent || uiEl.find(event.target).length) {
            return true;
        }

        var eventTarget = iParent;

        if (eventTarget.offset() && !(eventTarget.offset().top && eventTarget.height() && eventTarget.offset().left && eventTarget.width())) {
            return true;
        }

        if (eventTarget.offset() && (event.clientY > eventTarget.offset().top && event.clientY < eventTarget.offset().top + eventTarget.height() && event.clientX > eventTarget.offset().left && event.clientX < eventTarget.offset().left + eventTarget.width())) {
            return true;
        }

        clearInterval(observeScroll.timer);
        uiEl.hide();

        return true;
    };

    var gridClickInfo = {
        that: null,
        event: null,
        baseClickFunc: null
    };

    infoButtonUtils.onClickFunc = function(that, event, baseClickFunc) {
        event.stopImmediatePropagation();
        gridClickInfo.that = that;
        gridClickInfo.event = event;
        gridClickInfo.baseClickFunc = baseClickFunc;
        infoButtonUtils.showInfoButton(event);
        Messaging.getChannel('gists').trigger('close:gists');
    };

    $('body').on('click', infoButtonUtils.hideInfoButton);

    return infoButtonUtils;
});
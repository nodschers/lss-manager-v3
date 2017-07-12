(function(I18n, $) {
  'use strict';

  I18n.translations.de.lssm.doctorradiocall = {
    nef: "NEF"
  };
  I18n.translations.en.lssm.doctorradiocall = {
    nef: "HEMS"
  };
  I18n.translations.nl.lssm.doctorradiocall = {
    nef: "MMT-Auto"
  };

  // Hook into LSS function call
  $(document).bind(lssm.hook.postname("patientMarkerAdd"),function(event,payload){
	  handleFeedback(payload);
  });

  function handleFeedback(t) { // NOSONAR: Variable is declared globally in the main game.
    if (t.missing_text && t.missing_text.indexOf(I18n.t('lssm.doctorradiocall.nef')) >= 0) {
      radioMessage({
        "mission_id": t.mission_id,
        "additionalText": "",
        "user_id": user_id,
        "type": "vehicle_fms",
        "id": "",
        "fms_real": 5,
        "fms": 5,
        "fms_text": t.missing_text,
        "caption": ""
      });

      // Due we do not get a calling vehicle_id we have to remove the
      // corresponding button manually.
      var el = $('#radio_messages_important').find('a[href="/vehicles/"]');
      el.parent().find('a').click(function() {
        $(this).parent().hide();
      });
      el.remove();
    }
  };

})(I18n, jQuery);

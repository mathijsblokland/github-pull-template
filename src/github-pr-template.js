(function($) {
  setPrBody = function(){
    if ($('#commits_bucket').length > 0){
      // Stop interval if we detect the #commits_bucket
      clearInterval(handle);
      handle = 0;

      // Get context from the URL
      var branchBase = $('input[name="base"]:hidden').val().replace('Springest:', ''),
          branchHead = $('input[name="head"]:hidden').val().replace('Springest:', ''),
          prBody = $('textarea[name="pull_request[body]"]'),
          prBodyValue = prBody.val(),
          asanaLinks = '',
          asanaDivider = '';

      // If there is an Asana hash in our prBody (mostly when a pr contains 1 commit)
      $('.commit-message').each(function(){
        var elmText = $(this).text();
        if(/#(\d{14})/.test(elmText)){
          issueNumber = elmText.match(/#(\d{14})/);
          asanaLinks += asanaDivider + "[`#" + issueNumber[1] + "`](https://app.asana.com/0/12345678/" + issueNumber[1] + ")";
          asanaDivider = ', ';
        } else {
          asanaLinks = "[`#`](https://app.asana.com/0/12345678/)";
        }
      });

      // If there is a default template remove it (can happen due local storage)
      if(prBodyValue.indexOf("#### What's this PR do?\n\n#### Where should") >= 0){
        prBodyValue = '';
      }

      // Set default PR template
      var data = "#### What's this PR do?\n\n#### Where should the reviewer start?\n\n#### These steps were taken to test this PR:\n- [ ] Changes are demoed to the stakeholder (_name stakeholder_)\n- [ ] ~~Tested in a local development environment~~\n\n#### Any background context you want to provide?\n\n#### Screenshots (if appropriate)\n\n#### Important links:\n* _Asana issue(s):_ " + asanaLinks + "\n* _CodeClimate's comparison:_ [`" + branchBase + "` ... `" + branchHead + "`](https://codeclimate.com/repos/504f5356f3ea005e1c004209/compare/" + branchHead + ")\n\n#### Questions:\n  - Do we need to translate new strings? **Yes / No**\n  - Does anyone need to be notified when this has been deployed? **Yes / No**\n  - Does this include migrations that might take a while? **Yes / No**";

      // Add extra whitespace before default PR template if there is content
      if(prBodyValue != ''){
        data = '\n\n' + data;
      }

      // Set new prBody
      prBody.val(prBodyValue + data);
      prBody.css('height', '475px');
    }
  }

  // Set interval to detect if we are creating a PR
  var handle = setInterval(function() { setPrBody() }, 1000);

  // Bind an onclick for all pjax calls
  $('body').on('click', 'a[data-pjax]', function(){
    setTimeout(function(){ setPrBody() }, 1000);
  })
})(jQuery)

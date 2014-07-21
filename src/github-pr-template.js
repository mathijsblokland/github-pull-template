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
          prBodyValue = prBody.val()
          asanaIssue = '';

      // If there is an Asana hash in our prBody (mostly when a pr contains 1 commit)
      if(/#(\d{14})/.test($('.commit-message').text())){
        issueNumber = $('.commit-message').text().match(/#(\d{14})/);
        asanaIssue = issueNumber[1];
      }

      // If there is a default template remove it (can happen due local storage)
      if(prBodyValue.indexOf("#### What's this PR do?\n\n#### Where should") >= 0){
        prBodyValue = '';
      }

      // Set default PR template
      var data = "#### What's this PR do?\n\n#### Where should the reviewer start?\n\n#### How should this be manually tested?\n\n#### Any background context you want to provide?\n\n#### Screenshots (if appropriate)\n\n#### Important links:\n* _Asana issue(s):_ [`#" + asanaIssue + "`](https://app.asana.com/0/12345678/" + asanaIssue + ")\n* _CodeClimate's comparison:_ [`" + branchBase + "` ... `" + branchHead + "`](https://codeclimate.com/repos/504f5356f3ea005e1c004209/compare/" + branchHead + ")\n\n#### Questions:\n  - Do we need to translate new strings?\n  - Does anyone need to be notified when this has been deployed?\n  - Does this include migrations that might take a while?";

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
    setTimeout(function(){ setPrBody() }, 1000)
  })
})(jQuery)

function saveGmailAsEml(){
  // Set the 'filter' variable to the Gmail-syntaxed search criteria for the target messages.
  var filter = "-has:attachment in:inbox -has:label to:me older_than:21d after:2017/01/01"; 
  
  // Set the 'start' variable to the integer for the index of the item to which the script shall apply.
  // Index '0' starts the script at the first result.
  var start = 0;
  
  // Set the 'max' variable to the integer for the maximum number of results to which the script shall apply.
  var max = 10;
  
  // DO NOT ALTER. This sets the 'threads' variable to be the return of running GmailApp's 'search' method
  // using the 'filter', 'start', and 'max' parameters you set above. 
  var threads = GmailApp.search(filter,start,max);
	for(i in threads){
      // The return of 'threads' is the array 'i', for each item of which the script shall apply the sub-function
      // 'messages', which yields the return of running GmailApp's 'getMessages()' method on 'i'.
		var messages = threads[i].getMessages();
		for(j in messages){
          // The return of 'messages' is the array 'j' for each item of which the script shall perform two methods:
          // first, GmailApp's 'getId()' method to retrieve the Message-ID (held in the variable 'id');
			var id = messages[j].getId();
          // second, GmailApp's 'getRawContent()' method to retrieve the rfc822-standardized message content (held
          // in the variable 'rawContent').
			var rawContent = messages[j].getRawContent();
          // Finally, using DriveApp's 'createFile' method, the script compiles the rfc822-content ('rawContent')
          // and assigns a file name based on the Message-ID with the .eml extension ('id' + '.eml').
			DriveApp.createFile(id + '.eml', rawContent, 'message/rfc822');
		}
	}
}
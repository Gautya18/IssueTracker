function fetchIssues()
{
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issueList = $("#issuesList");
    issueList.empty();
    if(issues === null)
        return;
    for(var i=0;i<issues.length;i++)
    {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
        issueList.append('<div class="well">'+
        '<h6>Issue ID: ' + id + '</h6>'+
        '<p><span class="label label-info">' + status + '</span></p>'+
        '<h3>' + desc + '</h3>'+
        '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
        '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
        '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
        '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
        '</div>');
    }

}

function saveIssue(event)
{
    var issueId = chance.guid();
    var issueDesc = $('#issueDescInput').val();
    var issueSeverity = $('#issueSeverityInput').val();
    var issueAssignedTo = $('#issueAssignedToInput').val();
    var issueStatus = 'Open';

    var issue={
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }
    if(localStorage.getItem("issues") === null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem("issues",JSON.stringify(issues));
    }
    else
    {
        issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem("issues",JSON.stringify(issues));
    }
    console.log($("#issueInputForm").val());
    $("#issueInputForm").reset();
    fetchIssues();
    event.preventDefault();
}

//$("issueInputForm").on("submit",saveIssue); 

function setStatusClosed(id)
{
    var issues = JSON.parse(localStorage.getItem('issues'));
  
    for(var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
        issues[i].status = "Closed";
        }
    }
        
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}

function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }
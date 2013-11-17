startupgenome = angular.module 'TechGrindApp.startupgenome', []
#startupgenome.value 'version', '0.1'
#startupgenome.auth_code = '5ac893e8ef1f8159ef79a4b561d6c475'
#startupgenome.headers = array('AUTH-CODE: ' + startupgenome.auth_code)

#TODO: redo this code in angular :)
#<?php
#/* // auth code
#$auth_code = '[your-auth-code-here]';
#$headers = array("AUTH-CODE: {$auth_code}");

/*
# Get cURL resource
##$curl = curl_init();

// Set some options
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLINFO_HEADER_OUT, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_URL, 'http://startupgenome.com/api/organizations/city/boulder-co');

// Send the request & save response to $resp
$resp = curl_exec($curl);

// Close request to clear up some resources
curl_close($curl);


// output $resp (response from API)
echo "<pre>";
echo print_r(json_decode($resp,1));
exit();
?>
*/
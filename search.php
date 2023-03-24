<?php

require_once './vendor/autoload.php';

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
//use Kreait\firebase-php;

$firebase = (new Factory)
    ->withServiceAccount('search-app-8e79d-firebase-adminsdk-rehau-92d3e8ddc6.json')
    ->withDatabaseUri('https://search-app-8e79d-default-rtdb.asia-southeast1.firebasedatabase.app'); 


$database = $firebase->createDatabase();


$keyword = $_GET['keyword'];
if (!empty($keyword)) {
  $reference = $database->getReference('');
  $snapshot = $reference->getSnapshot();
  $data = $snapshot->getValue();
  
  $results = array();
  foreach ($data as $key => $value) {
    if (strpos(strtolower($value['data']), strtolower($keyword)) !== false) {
      array_push($results, $value);
    }
  }
  echo json_encode($results);
}
?>


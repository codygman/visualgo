<?php
  /*
   * Table name: test
   * Schema:
   * - username: primary key, foreign key to user table
   * - answer (serialized array)
   * - grade
   * - timeTaken
   * - startTime (datetime data structure)
   * - attemptCount
   */

  class TestDatabase{
    protected $db;

    public function __construct() {
      $this->db = mysqli_connect("localhost",DB_USERNAME,DB_PASSWORD,DB_NAME);

      if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
      }

      $this->init();
    }

    protected function init(){
      
    }

    public function validate($username, $password){

    }

    public function getTestParams(){
      $result = mysqli_query($this->db, "SELECT * FROM `test_config` WHERE `index`='"."0"."'");
      $config = mysqli_fetch_assoc($result);

      return $config;
    }

    public function begin($username, $password){
      if(!$this->validate($username, $password)) return false;

      // update attempt counter
      // if test is not open don't update attempt counter

      if(!$this->getTestParams["testIsOpen"]) return false;

      $attemptCount = mysqli_query($this->db, "SELECT `attemptCount` FROM `test` WHERE `username` = ".$username);
      $attemptCount = mysqli_fetch_assoc($attemptCount)["attemptCount"];
      $attemptCount++;
      $maxAttemptCount = $this->getTestParams["maxAttemptCount"];
      if($attemptCount <= 0 || $attemptCount > $maxAttemptCount) return false;

      mysqli_query($this->db, "UPDATE `test` SET `attemptCount` = '".($attemptCount)."' WHERE `username` = ".$username);

      $startTime = date('Y-m-d H:i:s');
      mysqli_query($this->db, "UPDATE `test` SET `startTime` = '".$startTime."' WHERE `username` = ".$username);
    }

    /*
     * params (all fields compulsory):
     * - answer: student's answer
     * - grade: student's grade
     * - timeTaken: time taken by student to complete the test
     */

    public function submit($username, $password, $params){
      // validate username and password
      if(!$this->validate($username, $password)) return false;

      // validate test is open
      if(!$this->getTestParams["testIsOpen"]) return false;

      // validate attempt count is > 0 and less than max allowed
      $maxAttemptCount = $this->getTestParams["maxAttemptCount"];

      $attemptCount = mysqli_query($this->db, "SELECT `attemptCount` FROM `test` WHERE `username` = ".$username);
      $attemptCount = mysqli_fetch_assoc($attemptCount)["attemptCount"];

      if($attemptCount <= 0 || $attemptCount > $maxAttemptCount) return false;

      // validate submission params
      if(!array_key_exists("answer", $params) || !array_key_exists("grade", $params) || !array_key_exists("timeTaken", $params) ||
        !array_key_exists("startTime", $params)){
        return false;
      }       

      mysqli_query($this->db, "UPDATE `test` SET `answer` = '".serialize($params["answer"])."' WHERE `username` = ".$username);
      mysqli_query($this->db, "UPDATE `test` SET `grade` = '".$params["grade"]."' WHERE `username` = ".$username);
      mysqli_query($this->db, "UPDATE `test` SET `timeTaken` = '".$params["timeTaken"]."' WHERE `username` = ".$username);
    }
    
?>
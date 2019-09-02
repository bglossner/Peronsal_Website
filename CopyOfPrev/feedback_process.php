<?php
	if ($_SERVER['REQUEST_METHOD'] != 'POST') {
		?>
		<html>
			<head>
				<script type="text/javascript">
					function startFunc() {
						console.log("HI");
						window.open(<?php echo "'/feedback-form.html'"; ?>, "_blank");
                        console.log((<?php echo (string)($_SERVER['REQUEST_METHOD']) ?>).toString());
					}
					window.onload = startFunc;
				</script>
			</head>
			<body>
			</body>
		</html>
		<?php
	}
    else
    {
		$str_json = file_get_contents('php://input');
		$returned_json = json_decode($str_json);
		echo "Start\n";
		//print_r($returned_json);
		foreach ($returned_json as $key => $value) {
			$data_sent[$key] = $value;
		}
		$servername = "localhost";
		$username = "bglossner";
		$password = "Doritos1";
		$db = "websitedb";

		try {
			$conn = new PDO("mysql:host=$servername;dbname=$db", $username, $password);
			// set the PDO error mode to exception
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			echo "Connected successfully\n";
			$feedback_values = array();
			array_push($feedback_values, strlen($data_sent["firstname"]) > 0 ? $data_sent["firstname"] : "NULL");
			array_push($feedback_values, strlen($data_sent["lastname"]) > 0 ? $data_sent["lastname"] : "NULL");
			array_push($feedback_values, strlen($data_sent["email"]) > 0 ? $data_sent["email"] : "NULL");
			array_push($feedback_values, strlen($data_sent["rating"]) > 0 ? $data_sent["rating"] : "NULL");
			array_push($feedback_values, strlen($data_sent["comments"]) > 0 ? $data_sent["comments"] : "NULL");

			$sql_command = "INSERT INTO Feedback (ID, Firstname, Lastname, Email, Rating, Comments) VALUES (default, ";
			for ($i = 0; $i < count($feedback_values) - 1; $i++)
			{
				$value = $feedback_values[$i];
				$sql_command .= $value !== "NULL" ? "\"" . $value . "\", " : "NULL, ";
			}
			$value = $feedback_values[count($feedback_values) - 1];
			$sql_command .= $value !== "NULL" ? "\"" . $value . "\")" : "NULL)";
			$conn->exec($sql_command);

			// Test SQL COmmand for the Feedback insertion
			//echo $sql_command;
			//exit(1);
			if(array_key_exists("numPlaces", $data_sent))
			{
				$more_specific = array();
				for ($i = 0; $i < $data_sent["numPlaces"]; $i++)
				{
					array_push($more_specific, $data_sent["placeRow{$i}"]);
				}
				//$assocID = 2;
				$assocID = $conn->lastInsertId();
				array_push($more_specific, NULL);
				$sql_command = "INSERT INTO SpecificFeedback (FeedbackID, Gen_Area, Spec_Area, Problem, Add_Comments) VALUES ";
				if(count($more_specific) > 0)
				{
					foreach ($more_specific as $placeObj)
					{
						if($placeObj === NULL)
						{
							$sql_command = substr($sql_command, 0, strlen($sql_command) - 2);
							break;
						}
						foreach ($placeObj as $key => $value)
						{
							$place[$key] = $value;
						}
						$spec_place_values = array();
						array_push($spec_place_values, strlen($place["place"]) > 0 ? $place["place"] : "NULL");
						array_push($spec_place_values, strlen($place["place-desc"]) > 0 ? $place["place-desc"] : "NULL");
						array_push($spec_place_values, strlen($place["problem"]) > 0 ? $place["problem"] : "NULL");
						array_push($spec_place_values, strlen($place["add-comments"]) > 0 ? $place["add-comments"] : "NULL");
						$sql_command .= "({$assocID},";
						for ($i = 0; $i < count($spec_place_values) - 1; $i++)
						{
							$value = $spec_place_values[$i];
							$sql_command .= $value !== "NULL" ? "\"" . $value . "\", " : "NULL, ";
						}
						$value = $spec_place_values[count($spec_place_values) - 1];
						$sql_command .= $value !== "NULL" ? "\"" . $value . "\"), " : "NULL), ";
					}

					// Test specific feedback area sql command
					//echo "\n" . $sql_command;
					$conn->exec($sql_command);
				}
			}

			$text = "An email was submitted rating the website overall as: " . $data_sent["rating"] . $
                        
			//$text = "Email test";

			$mail = new PHPMailer(TRUE);

			$mail->setFrom('benglossnerwebsite@gmail.com', 'Website Email');
			$mail->addAddress('benaglossner@gmail.com', 'Ben Glossner');
			$mail->Subject = 'Website Feedback Submission';
			$mail->Body = $text;

			/* SMTP parameters. */

			/* Tells PHPMailer to use SMTP. */
			$mail->isSMTP();

			/* SMTP server address. */
			$mail->Host = 'smtp.gmail.com';

			/* Use SMTP authentication. */
			$mail->SMTPAuth = TRUE;

			/* Set the encryption system. */
			$mail->SMTPSecure = 'tls';

			/* SMTP authentication username. */
			$mail->Username = 'benglossnerwebsite@gmail.com';

			/* SMTP authentication password. */
			$mail->Password = 'ben00020280website';

			/* Set the SMTP port. */
			$mail->isSMTP();
    
			/* SMTP server address. */
			$mail->Host = 'smtp.gmail.com';

			/* Use SMTP authentication. */
			$mail->SMTPAuth = TRUE;

			/* Set the encryption system. */
			$mail->SMTPSecure = 'tls';

			/* SMTP authentication username. */
			$mail->Username = 'benglossnerwebsite@gmail.com';

			/* SMTP authentication password. */
			$mail->Password = 'ben00020280website';

			/* Set the SMTP port. */
			$mail->Port = 587;

			/* Finally send the mail. */
			if (!$mail->send())
			{
					/* PHPMailer error. */
					echo $mail->ErrorInfo;
			}
		}
		catch(PDOException $e)
		{
			echo "Connection failed: " . $e->getMessage();
		}

		$conn = NULL;
	}
?>
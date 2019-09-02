#include "databasing.h"

//Initializes the MYSQL connection pointer
static MYSQL *con = NULL;
//Used to increase efficiency of knowing if table exists or not
static char lastTable[20];

//Any kind of error occurred
int error_occurred(void)
{
	printf("%s\n", mysql_error(con));
	mysql_close(con);
	printf("CYA\n");
	return 1;
}

//Show the columns from ONLY table Lab_Standard_1
int showColumns(void)
{
	if (mysql_query(con, "SHOW COLUMNS FROM Lab_Standard_1"))
	{
		error_occurred();
	}
	printf("\nShowing Columns...\n");
	return 1;
}

//Check if a given table exists or not
int isThatATable(char table_name[])
{
	char queryString[64]; //Variable to hold MYSQL query command
	bzero(queryString, 64);
	snprintf(queryString, 64, "show tables like '%s'", table_name);
	//printf("MYSQL string: %s\n", queryString);
	//Actual command sent
	if(mysql_query(con, queryString))
	{
		return error_occurred();
	}
	
	//Result of sending command
	MYSQL_RES *result = mysql_store_result(con);
	if(result == NULL)
	{
		return error_occurred();
	}
	MYSQL_ROW row;
	//Check to make sure that the response is there (meaning it is a table)
	if((row = mysql_fetch_row(result)) == NULL)
	{
		printf("Not a table name\n");
		//error_occurred();
		return 0;
	}
	else
	{
		printf("Is a table\n");
		mysql_free_result(result);
		return 1;
	}
	//printf(row[0]);
	return 0;
}

//Delete rows of Lab_Standard_1 column where Year listed is 2018
int deleteFirstRow(void)
{
	//Sends query through connection
	if(mysql_query(con, "DELETE FROM Lab_Standard_1 WHERE Year=2018"))
	{
		error_occurred();
	}
	//Reset the ID to 1
	if(mysql_query(con, "ALTER TABLE Lab_Standard_1 AUTO_INCREMENT = 1"))
	{
		error_occurred();
	}
	printf("\nDeleted row successfully...\n");
	return 1;
}

//Put in test row for Lab_Standard_1
int enterTestRow(void)
{
	//Number of float type columns
	int maxCount = 55;
	char c[(6 * maxCount) + 1]; //Character string for holding floats and comma 
	memset(c, 0, sizeof(c)); //initialize it to 0s
	
	//Add commas and the actual 10.02s to the character array
	for(int i = 0; i < maxCount; i++)
	{
		//Not the last element
		if (i > 0)
		{
			strcat(c, ",");
		}
		strcat(c, "10.02");
	}
	strcat(c, "\0"); //Null terminate string
	printf("%s\n", c);
	char queryString[800]; //Just a holder value
	memset(queryString, 0, sizeof(queryString));
	
	//Put the string and character array into queryString variable
	snprintf(queryString, 799, "INSERT INTO Lab_Standard_1 VALUES(default,%s,2018,3562354)", c);
	printf("%s\n", queryString);
	
	//Insert the data
	if(mysql_query(con, queryString))
	{
		error_occurred();
	}
	printf("\nUpdated Table Successfully...\n");
	return 1;
}

int initializeMYSQLConnection(char *db)
{
	//Make initial connection
	if(con == NULL)
	{
		con = mysql_init(NULL);
		if(con == NULL)
		{
			//Error
			printf("%s\n", mysql_error(con));
			return 1;
		}
		
		bzero(lastTable, 20);
		
		//Connect to the actual database as a user
		if(mysql_real_connect(con, "----", "----", "----", db, 0, NULL, 0) == NULL)
		{
			return error_occurred();
		}
		
		return 0; //Successful
	}
	else
	{
		printf("Database already connected\n");
		bzero(lastTable, 20);
		return 0;
	}
}

//Shutdown the connection
int closeMYSQLConnection(void)
{
	printf("Closing connection\n");
	if(con != NULL)
	{
		mysql_close(con);
		con = NULL;
		return 0;
	}
	else
	{
		printf("No connection there");
		return 1;
	}
}

//Unused.
int enterRowInTable(float vVals[], char table_name[], uint8_t bVal)
{
	if(bVal)
	{
		if(isThatATable(table_name))
		{
			;
		}
	}
	return 1;
}

//For 6 voltages from Ref1 and Ref2
int enterRowInVoltageTable(VoltageStructure_t *pobVoltStruc)
{
	char tableName[] = "Voltages6";
	//Check to see if the Voltages6 table exists yet if WE HAVE NOT SUCCESSFULLY SENT TO IT YET
	if((strcmp(lastTable, tableName) != 0) && (!isThatATable(tableName)))
	{
		char queryString[350];
		bzero(queryString, 350);
		//Voltage string
		snprintf(queryString, 349, "create table Voltages6 (%s,%s,%s,%s,%s,%s,%s,%s,%s)",\
													"ID INT PRIMARY KEY AUTO_INCREMENT",\
													"LS1_VA FLOAT NOT NULL",\
													"LS1_VB FLOAT NOT NULL",\
													"LS1_VC FLOAT NOT NULL",\
													"LS2_VA FLOAT NOT NULL",\
													"LS2_VB FLOAT NOT NULL",\
													"LS2_VC FLOAT NOT NULL",\
													"Year INT",\
													"Seconds_of_Year INT");
		//Command Sent
		if(mysql_query(con, queryString))
		{
			return error_occurred();
		}
	}
	
	//Data insertion time
	char mainQueryString[800];
	bzero(mainQueryString, 800);
	snprintf(mainQueryString, 799, "INSERT INTO Voltages6 VALUES(default,%f,%f,%f,%f,%f,%f,%d,%d)",\
								pobVoltStruc->LS1_VA, pobVoltStruc->LS1_VB, pobVoltStruc->LS1_VC,\
								pobVoltStruc->LS2_VA, pobVoltStruc->LS2_VB, pobVoltStruc->LS2_VC,\
								pobVoltStruc->ui16Year, pobVoltStruc->ui32SecondsOfYear);
								
	//Command Sent
	if(mysql_query(con, mainQueryString))
	{
		return error_occurred();
	}
	else
	{
		//ON SUCCESS
		printf("Data inserted into Voltages6\n");
		
		//Set the table name
		bzero(lastTable, 20);
		memcpy(lastTable, tableName, sizeof(lastTable));
		return 0;
	}
	return 0;
}

//Enter record into BasicStructure table. Same documentation as above
int enterRowInBasicStructure(ATestSetRef_t *pobBasicStruc)
{
	char tableName[] = "BasicStructure";
	if((strcmp(lastTable, tableName) != 0) && (!isThatATable(tableName)))
	{
		char queryString[700];
		bzero(queryString, 700);
		snprintf(queryString, 699, "create table %s (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",\
													tableName,\
													"ID INT PRIMARY KEY AUTO_INCREMENT",\
													"V_fMag FLOAT NOT NULL",\
													"V_fPhase FLOAT NOT NULL",\
													"I_fMag FLOAT NOT NULL",\
													"I_fPhase FLOAT NOT NULL",\
													"Power_fW FLOAT NOT NULL",\
													"Power_fVar FLOAT NOT NULL",\
													"Power_fVa FLOAT NOT NULL",\
													"Power_fPf FLOAT NOT NULL",\
													"Power_fQ FLOAT NOT NULL",\
													"Freq FLOAT NOT NULL",\
													"Year INT",\
													"Seconds_of_Year INT");
		if(mysql_query(con, queryString))
		{
			return error_occurred();
		}
	}
	
	char mainQueryString[600];
	bzero(mainQueryString, 600);

	snprintf(mainQueryString, 599, "INSERT INTO %s VALUES(default,%f,%f,%f,%f,%f,%f,%f,%f,%f,%f,%d,%d)", tableName,
								pobBasicStruc->obV.fMag, pobBasicStruc->obV.fPhase, pobBasicStruc->obI.fMag,
								pobBasicStruc->obI.fPhase, pobBasicStruc->obPower.fW, pobBasicStruc->obPower.fVar,
								pobBasicStruc->obPower.fVa, pobBasicStruc->obPower.fQ, pobBasicStruc->obPower.fPf,
								pobBasicStruc->fFreq, pobBasicStruc->ui16Year, pobBasicStruc->ui32SecOfYear);
								
	if(mysql_query(con, mainQueryString))
	{
		return error_occurred();
	}
	else
	{
		printf("Data inserted into BasicStructure\n");
		bzero(lastTable, 20);
		memcpy(lastTable, tableName, sizeof(lastTable));
	}
	
	return 0;
}

/*int main()
{
	MYSQL *con = mysql_init(NULL);
	if(con == NULL)
	{
		printf("%s\n", mysql_error(con));
		exit(1);
	}
	
	if(mysql_real_connect(con, "localhost", "pi", "raspberry", "pythonDB", 0, NULL, 0) == NULL)
	{
		error_occurred(con);
	}
	else
	{
		printf("Successful connection\n");
		char inputChar;
		//memset(inputChar, 0, sizeof(inputChar));
		int inputInt;
		printf("Enter a:\t[0] - Delete Row\n\t\t[1] - Add Test Row\n\t\t[2] - Show Columns\n\n:");
		inputChar = getchar();
		if(isdigit(inputChar))
		{
			inputInt = inputChar - '0';
		}
		switch(inputInt)
		{
			case 0:
				deleteFirstRow(con);
				break;
			case 1:
				enterTestRow(con);
				break;
			case 2:
				showColumns(con);
				break;
			default:
				printf("%d: is not an acceptable input\n", inputInt);
				break;
		}
		//exit(1);
		//deleteFirstRow(con);
		//enterTestRow(con);
		MYSQL_RES *result = mysql_store_result(con);
		if(result == NULL)
		{
			error_occurred(con);
		}
		MYSQL_ROW row;
		int num_fields = mysql_num_fields(result);
		//printf("%d\n", mysql_num_rows(result));
		//int count = 0;
		while ((row = mysql_fetch_row(result)))
		{
			for(int i = 0; i < num_fields; i++)
			{
				printf("%s ", row[i]);
			}
			printf("\n");
			//count++;
		}
		//printf("Total Columns: %d", count);
		mysql_free_result(result);
	}
	mysql_close(con);
}*/

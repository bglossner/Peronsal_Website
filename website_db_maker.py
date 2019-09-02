# python3

import mysql.connector as mariadb

def make_tables():
    mariadb_connection = mariadb.connect(user='bglossner', password='Doritos1', database='websitedb')
    cursor = mariadb_connection.cursor()
    cursor.execute('create table Feedback (ID INT NOT NULL AUTO_INCREMENT, Firstname varchar(32), Lastname varchar(32), \
                    Email varchar(32), Rating varchar(32) NOT NULL, \
                    Comments text, PRIMARY KEY (ID))')

    cursor.execute('create table SpecificFeedback (FeedbackID INT NOT NULL, Gen_Area varchar(32), \
                    Spec_Area varchar(32), Problem varchar(32), Add_Comments text, FOREIGN KEY (FeedbackID) REFERENCES Feedback(ID))')
    mariadb_connection.close()

make_tables()
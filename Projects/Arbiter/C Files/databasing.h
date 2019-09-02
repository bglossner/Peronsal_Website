#ifndef  _DATABASING_INCLUDED
#define  _DATABASING_INCLUDED

#include <mysql.h>
#include <stdio.h>
#include <string.h>
#include <strings.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>
#include <stdint.h>
#include "pmcd.h"
#include "voltage.h"

int enterTestRow(void);

int initializeMYSQLConnection(char *db);

int closeMYSQLConnection(void);

int enterRowInTable(float vVals[], char table_name[], uint8_t bVal);
int enterRowInVoltageTable(VoltageStructure_t *obVoltStruc);

#endif

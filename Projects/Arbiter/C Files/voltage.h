#ifndef _VOLTAGESTRUC
#define _VOLTAGESTRUC

#include "packing.h"

typedef struct VoltageStructure
{
	uint32_t ui32SecondsOfYear;
	uint16_t ui16Year;
	float LS1_VA;
	float LS1_VB;
	float LS1_VC;
	float LS2_VA;
	float LS2_VB;
	float LS2_VC;
}GCC_PACK VoltageStructure_t;

#endif

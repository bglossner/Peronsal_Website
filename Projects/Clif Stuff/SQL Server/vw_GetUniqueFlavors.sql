/**
	This gets distinct flavors. It grabs it from the nutrition database
	and the Clif EDW one
*/

USE [PowerApps]
GO

/****** Object:  View [dbo].[vw_GetUniqueFlavors]    Script Date: 7/22/2019 10:39:27 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP VIEW IF EXISTS vw_GetUniqueFlavors
GO

CREATE VIEW [dbo].[vw_GetUniqueFlavors]
AS
	SELECT
		' -- Add New Item -- ' AS 'Flavor'
	UNION
	SELECT DISTINCT
		LTRIM(RTRIM(Flavor)) AS 'Flavor'
	FROM
		(SELECT
			Flavor
		FROM
			vw_GetMostRelevantNutritionData
		UNION
		SELECT
			ItemPurchaseCode02Desc AS 'Flavor'
		FROM
			vw_RelevantProductUPCCodes) AS idk
GO



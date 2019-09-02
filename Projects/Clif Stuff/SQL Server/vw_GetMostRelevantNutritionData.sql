/**
	Gets all nutrition items according to the following:
		- It is the most recent item updated according to the InitialEntryID and Effective Date
		- It's not a deleted item
*/

USE [PowerApps]
GO

/****** Object:  View [dbo].[vw_GetMostRelevantNutritionData]    Script Date: 7/22/2019 3:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP VIEW IF EXISTS vw_GetMostRelevantNutritionData
GO

CREATE VIEW [dbo].[vw_GetMostRelevantNutritionData]
AS
	SELECT        
		ID, 
		LTRIM(RTRIM(Flavor)) AS 'Flavor', 
		LTRIM(RTRIM(Company)) AS 'Company', 
		LTRIM(RTRIM(Product)) AS 'Product', 
		LTRIM(RTRIM([Portfolio Role])) AS 'Portfolio Role', 
		[Carbohydrate (g)], 
		[Fiber (g)], 
		[Glycemic Index],
		[GI Category], 
		[Total Sugar (g)], 
		[Added Sugars (g)], 
		[% DV Added Sugar], 
		Calories, 
		[% calories from added sugar], 
		[Protein (g)], 
        [Total Fat (g)], 
		[Saturated Fat (g)], 
		[Sodium (mg)], 
		[Serving Size (g)], 
		[UPC Code], 
		[Effective Date], 
		IsTestData,
		InitialEntryID,
		app.Username,
		app.DBChangeType,
		app.TimeEntered
	FROM            
		dbo.vw_GetItemsByMaxDateUPC AS nut
	LEFT JOIN
		(SELECT 
			ROW_NUMBER() OVER(PARTITION BY nut_temp.InitialEntryID ORDER BY TimeEntered DESC) AS RowNum, 
			app_temp.Username, 
			app_temp.DBChangeType, 
			app_temp.TimeEntered, 
			app_temp.DBChangeID
		FROM 
			AppDataLog as app_temp
		INNER JOIN
			NutritionDashboardData AS nut_temp
		ON
			nut_temp.ID = app_temp.DBChangeID
		WHERE
			DBChangeType != 'delete') AS app
	ON
		app.DBChangeID = nut.ID
	WHERE        
		(IsDeleted = 0) AND
		(app.RowNum = 1 OR
			app.RowNum IS NULL)
GO



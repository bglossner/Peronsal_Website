/**
	This is used to get important information from Clif's EDW
	database for Packages (not singles)
*/

USE [PowerApps]
GO

/****** Object:  View [dbo].[vw_RelevantPackageUPCCodes]    Script Date: 7/18/2019 9:07:54 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP VIEW IF EXISTS [dbo].[vw_RelevantPackageUPCCodes]
GO

CREATE VIEW [dbo].[vw_RelevantPackageUPCCodes]
AS
	SELECT
		itemcross.ItemNumCustomerSupplier AS 'UPC',
		--Looks like we can get flavor isolated from Pack Type
		item.ItemPurchaseCode02,
		item.ItemPurchaseCode02Desc,
		CASE
			WHEN item.ItemPurchaseCode01 LIKE '%M' THEN CONCAT(RTRIM(LTRIM(item.ItemPurchaseCode04Desc)), ' Mini')
			ELSE item.ItemPurchaseCode04Desc
		END AS 'ItemPurchaseCode04Desc',
		ItemPurchaseCode01
		--This could be our "Product" equivalent for the Nutrition data set. 

	FROM
		EDW.dbo.DimItemCrossReference itemcross
		LEFT JOIN EDW.dbo.DimItem item
			ON item.ItemSKey = itemcross.ItemSKey

	WHERE
		--This is the UPC lookup
		itemcross.CrossReferenceTypeCode = 'C'
		AND itemcross.ItemNumCustomerSupplier LIKE '00%'
		AND Description1 NOT LIKE '% CAN%'
		AND ItemSalesCode10 != 'SAM'
		AND Description2 NOT LIKE 'Bar%'
		AND Description2 NOT LIKE 'Pouch%'
		AND Description2 <> 'ea';
GO
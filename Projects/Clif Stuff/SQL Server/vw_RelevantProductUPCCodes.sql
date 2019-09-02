/**
	This is used to get important information from Clif's EDW
	database for single items
*/

USE [PowerApps]
GO

/****** Object:  View [dbo].[vw_RelevantProductUPCCodes]    Script Date: 7/18/2019 9:07:54 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP VIEW IF EXISTS [dbo].[vw_RelevantProductUPCCodes]
GO

CREATE VIEW [dbo].[vw_RelevantProductUPCCodes]
AS
	SELECT
		itemcross.ItemNumCustomerSupplier AS 'UPC',
    
		--Looks like we can get flavor isolated from Pack Type
		item.ItemPurchaseCode02,
		item.ItemPurchaseCode02Desc,
		item.ItemPurchaseCode04Desc,
		--This could be our "Product" equivalent for the Nutrition data set. 
		item.ItemPurchaseCode01Desc 

	FROM
		EDW.dbo.DimItemCrossReference itemcross
		LEFT JOIN EDW.dbo.DimItem item
			ON item.ItemSKey = itemcross.ItemSKey

	WHERE
		--This is the UPC lookup
		itemcross.CrossReferenceTypeCode = 'C'
		AND itemcross.ItemNumCustomerSupplier LIKE '00%' -- Gotta be a 14 digit
		AND Description1 NOT LIKE '% CAN%' -- Must be dometsic
		AND (Description2 LIKE 'Bar%'
			OR Description2 LIKE 'Pouch%'
			OR Description2 LIKE 'ea%'
			OR Description1 LIKE 'Bar%'
			OR Description1 LIKE 'Pouch%'
			OR Description1 LIKE 'ea%') -- Singles test
		AND ItemSalesCode10 != 'SAM' -- Not a sample item
		AND ItemPurchaseCode01 NOT LIKE '%PK' -- Singles enforcement too
		AND ItemPurchaseCode01 <> 'VPC'; -- Can't be a variety pack
GO
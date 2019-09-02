SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Ben Glossner
-- Create date: 8/20/2019
-- Description:	Does barcode lookup similar to what app does
-- Flow: InNutritionDB -> IsBox -> IsVarietyPack -> IsMini -> Find appropriate UPC for box -> InNutritionDB -> ClifProduct
--		 NotBox -> InNutritionDB -> IsClifProduct -> API Call -> Can't do anything
-- ReturnCode: 
--		0 -> Unknown Item -> can only autofill UPC
--		1 -> InNutritionDB -> autofill everything
--		2 -> IsClifProduct OR API found the product -> autofill UPC, Flavor, Product, Company
--		3 -> IsVarietyPack -> produce error
--
-- NEEDS TO HAVE API CALL STILL DONE
-- =============================================

DROP PROCEDURE IF EXISTS [dbo].[sp_OnBarcodeScan]
GO

CREATE PROCEDURE [dbo].[sp_OnBarcodeScan]
( 
	@UPC CHAR(20)
)
AS
BEGIN
	DECLARE @NutID AS INT;
	DECLARE @FlavorReturned AS CHAR(50);
	DECLARE @FlavorCodeReturned AS CHAR(5);
	DECLARE @ProductReturned AS CHAR(50);
	DECLARE @ProductType AS CHAR(5);

	SET @NutID = 
		(SELECT TOP 1
			InitialEntryID
		FROM
			vw_GetMostRelevantNutritionData
		WHERE
			[UPC Code] = @UPC);
	IF @NutID IS NOT NULL
		BEGIN
			SELECT @NutID AS 'InitialEntryID', 1 AS 'ReturnCode';
			RETURN 1;
		END

	SELECT TOP 1 
		@FlavorCodeReturned = ItemPurchaseCode02,
		@FlavorReturned = ItemPurchaseCode02Desc, 
		@ProductReturned = ItemPurchaseCode04Desc, 
		@ProductType = ItemPurchaseCode01
	FROM 
		vw_RelevantPackageUPCCodes 
	WHERE 
		UPC = @UPC;

	IF @FlavorReturned IS NOT NULL
		BEGIN
			IF LEFT(@ProductType, 2) = 'VP'
				-- This is a variety pack
				SELECT 3 AS 'ReturnCode';
			ELSE
				BEGIN
					IF RIGHT(@ProductReturned, 4) = 'Mini'
						BEGIN
							SET @NutID = 
								(SELECT TOP 1 
									InitialEntryID
								FROM 
									vw_GetMostRelevantNutritionData 
								WHERE
									(Product = @ProductReturned AND Flavor = @FlavorReturned)
									OR
									([UPC Code] = @UPC));
							IF @NutID IS NULL
								BEGIN
									SELECT TOP 1 
										LTRIM(RTRIM(ItemPurchaseCode02Desc)) AS 'Flavor', 
										LTRIM(RTRIM(ItemPurchaseCode04Desc)) AS 'Product',
										LTRIM(RTRIM(UPC)) AS 'UPC',
										2 AS 'ReturnCode'
									FROM 
										vw_RelevantProductUPCCodes
									WHERE 
										ItemPurchaseCode02 = @FlavorCodeReturned
									AND 
										ItemPurchaseCode04Desc = @ProductReturned;
									RETURN 2;
								END
							ELSE
								BEGIN
									SELECT @NutID AS 'InitialEntryID', 1 AS 'ReturnCode';
									RETURN 1;
								END
						END
					ELSE
						BEGIN
							SELECT TOP 1 
								@FlavorReturned = ItemPurchaseCode02Desc, 
								@ProductReturned = ItemPurchaseCode04Desc,
								@UPC = UPC
							FROM 
								vw_RelevantProductUPCCodes
							WHERE 
								ItemPurchaseCode02 = @FlavorCodeReturned
							AND 
								ItemPurchaseCode04Desc = @ProductReturned;
							
							SET @NutID = 
								(SELECT TOP 1
									InitialEntryID
								FROM
									vw_GetMostRelevantNutritionData
								WHERE
									[UPC Code] = @UPC);

							IF @NutID IS NULL
								BEGIN
									SELECT LTRIM(RTRIM(@FlavorReturned)) AS 'Flavor', LTRIM(RTRIM(@ProductReturned)) AS 'Product', LTRIM(RTRIM(@UPC)) AS 'UPC', 2 AS 'ReturnCode';
									RETURN 2;
								END
							ELSE
								BEGIN
									SELECT @NutID AS 'InitialEntryID', 1 AS 'ReturnCode';
									RETURN 1;
								END
						END
				END
		END
	ELSE
		BEGIN
			SELECT TOP 1 
				@FlavorReturned = ItemPurchaseCode02Desc, 
				@ProductReturned = ItemPurchaseCode04Desc
			FROM 
				vw_RelevantProductUPCCodes
			WHERE 
				UPC = @UPC;

			IF @FlavorReturned IS NULL
				BEGIN
					SELECT 0 AS 'ReturnCode'; --, 'FLAVOR' AS 'Flavor', 'Bens' AS Company;
					RETURN 0;
				END
			ELSE
				BEGIN
					SELECT LTRIM(RTRIM(@FlavorReturned)) AS 'Flavor', LTRIM(RTRIM(@ProductReturned)) AS 'Product', LTRIM(RTRIM(@UPC)) AS 'UPC', 2 AS 'ReturnCode';
					RETURN 2;
				END
		END


	SELECT 0 AS 'ReturnCode';
	RETURN 0;

END
GO

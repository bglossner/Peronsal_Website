SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Ben Glossner
-- Create date: 7/30/2019
-- Description:	Sets glycemic index and GI category
-- =============================================

DROP PROCEDURE IF EXISTS [dbo].[sp_SetItemGlycemicIndex]
GO

CREATE PROCEDURE [dbo].[sp_SetItemGlycemicIndex]
( 
	@ItemID INT,
	@Username NVARCHAR(50),
	@Email CHAR(50),
	@TimeEntered DATETIME2(0),
	@Index NVARCHAR(50),
	@Category NVARCHAR(50)
)
AS
BEGIN
	
	UPDATE
		NutritionDashboardData
	SET
		[Glycemic Index] = @Index,
		[GI Category] = @Category
	WHERE
		ID = @ItemID;

	INSERT INTO
		AppDataLog
			(Username,
			TimeEntered,
			UserEmail,
			DBChangeID,
			DBChangeType)
	VALUES (
		@Username,
		@TimeEntered,
		@Email,
		@ItemID,
		'edit'
	)

	RETURN 1;
END
GO

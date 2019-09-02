DECLARE
	@COL_NAME nvarchar(MAX),
	@COUNTOUT INT;

DECLARE column_iterator CURSOR
FOR
	SELECT COLUMN_NAME
	FROM INFORMATION_SCHEMA.COLUMNS
	WHERE TABLE_NAME = N'excel_sheet_nutrients';

OPEN column_iterator;

FETCH NEXT FROM column_iterator INTO 
    @COL_NAME;
 
WHILE @@FETCH_STATUS = 0
    BEGIN
		DECLARE @QRY NVARCHAR(MAX) = 
			'SELECT 
				@COUNTOUT=COUNT(*) 
			FROM 
				PowerApps.dbo.excel_sheet_nutrients 
			WHERE 
				COALESCE(TRY_CAST(' + @COL_NAME + ' AS DECIMAL(18, 3)), 1) % 1 != 0';

        EXEC SP_EXECUTESQL 
			@Query = @QRY, 
			@Params = N'@COUNTOUT INT OUTPUT',
			@COUNTOUT = @COUNTOUT OUTPUT

		IF @COUNTOUT > 0
			BEGIN
				PRINT @COL_NAME
			END

        FETCH NEXT FROM column_iterator INTO 
			@COL_NAME;
    END;

CLOSE column_iterator;
 
DEALLOCATE column_iterator;

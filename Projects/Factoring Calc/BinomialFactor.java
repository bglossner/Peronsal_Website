public class BinomialFactor extends Factor
{
    public int firstNum, secondNum = 3;

    public BinomialFactor(int bV, int cV)
    {
        super(1, bV, cV);
        findXValueBC();
    }
    int f = 0;

    /**
     * Creates and sets a and b values based on the equation (x + a)(x + b).
     */
    public void findXValueBC()
    {  
        for(int n = Math.abs(c) * -1; n <= Math.abs(c); n++)
        {
            for(int r = Math.abs(c) * -1; r <= Math.abs(c); r++)
            { 
                if(n * r == c && n + r == b)
                {
                    firstNum = n;
                    secondNum = r;
                    return;
                }
            }
        }
    }

    /**
     * Returns the absolute value of firstNum.
     * @returns     Positive integer value of firstNum.
     */
    public int getValue()
    {
        return Math.abs(firstNum);
    }

    /**
     * Returns the absolute value of secondNum
     * @returns     Positive integer value of secondNum.
     */
    public int getOtherValue()
    {
        return Math.abs(secondNum);
    }

    /**
     * Returns the sign of firstNum.
     * @returns     String "+" or "-" depending on if firstNum is positive or negative.
     */
    public String sign()
    {
        if(firstNum > 0)
        {
            return "+";
        }
        else
        {
            return "-";
        }
    }

    /**
     * Returns the sign of secondNum.
     * @returns     String "+" or "-" depending on if secondNum is positive or negative.
     */
    public String otherSign()
    {
        if(secondNum > 0)
        {
            return "+";
        }
        else
        {
            return "-";
        }
    }

    /**
     * Returns String of of (x + a)(x + b) based on the signs and values of firstNum and secondNum.
     * @return      String of (x (sign) firstNum)(x (sign) (secondNum)).
     */
    public String toStringForBF()
    {
        if(firstNum == 0 && secondNum == 3)
        {
            return "Incorrect";
        }
        return "(x " + sign() + " " + getValue() + ")(x " + otherSign() + " " + getOtherValue()+ ")";
    }
}
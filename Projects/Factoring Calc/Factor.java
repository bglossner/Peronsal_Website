import javax.swing.*;
import java.util.ArrayList;

public class Factor //Only with x^2
{
    public int a, b, c;
    int work = 0;
    String answerAsStr;
    String copy;
    static ArrayList<String> tempArrList = new ArrayList<String>();
    public Factor(JTextField jText)
    {
        String s = jText.getText();
        s = s.replace(" ", "");
        copy = new String(s);
        String aV = "";
        String bV = "";
        String cV = "";
        if(s.charAt(s.indexOf("^") + 1) != '2')
        {
            return;
        }
        work = 4;
        int num2Or3 = s.indexOf("-");
        int num3Or2 = s.indexOf("+");
        if(!(num2Or3 == -1 && num3Or2 == -1))
        {
            int countV = 0;
            while(s.charAt(countV) != 'x')
            {
                aV += "" + s.charAt(countV);
                countV++;
            }
            if(aV.length() == 0)
            {
                aV = "1";
            }
            a = Integer.parseInt(aV);
            countV = s.indexOf("^2") + 2;

            if(s.indexOf("x") != s.lastIndexOf("x"))
            {
                while(s.charAt(countV) != 'x')
                {
                    bV += "" + s.charAt(countV);
                    countV++;
                }
                b = Integer.parseInt(bV);
                countV = s.lastIndexOf("x") + 1;
                while(countV < s.length())
                {
                    cV += "" + s.charAt(countV);
                    countV++;
                }
                c = Integer.parseInt(cV);
            }
            else
            {
                b = 0;
                countV = s.indexOf("^2") + 2;
                while(countV < s.length())
                {
                    cV += "" + s.charAt(countV);
                    countV++;
                }
                c = Integer.parseInt(cV);
            }
        }
        else
        {
            answerAsStr = "Incorrect";
        }

        if(a == 1)
        {
            BinomialFactor bf = new BinomialFactor(b, c);
            answerAsStr = bf.toStringForBF();
        }
        else
        {
            HardFactor hf = new HardFactor(a, b, c);
            answerAsStr = hf.printForAns();
        }
    }
    
    public Factor(){}
    
    public Factor(JTextField jText, String strrr)
    {
        String s = jText.getText();
        s = s.replace(" ", "");
        copy = new String(s);
        String aV = "";
        String bV = "";
        String cV = "";
        if(s.charAt(s.indexOf("^") + 1) != '2')
        {
            return;
        }
        work = 4;
        int num2Or3 = s.indexOf("-");
        int num3Or2 = s.indexOf("+");
        if(!(num2Or3 == -1 && num3Or2 == -1))
        {
            int countV = 0;
            while(s.charAt(countV) != 'x')
            {
                aV += "" + s.charAt(countV);
                countV++;
            }
            if(aV.length() == 0)
            {
                aV = "1";
            }
            a = Integer.parseInt(aV);
            countV = s.indexOf("^2") + 2;

            if(s.indexOf("x") != s.lastIndexOf("x"))
            {
                while(s.charAt(countV) != 'x')
                {
                    bV += "" + s.charAt(countV);
                    countV++;
                }
                b = Integer.parseInt(bV);
                countV = s.lastIndexOf("x") + 1;
                while(countV < s.length())
                {
                    cV += "" + s.charAt(countV);
                    countV++;
                }
                c = Integer.parseInt(cV);
            }
            else
            {
                b = 0;
                countV = s.indexOf("^2") + 2;
                while(countV < s.length())
                {
                    cV += "" + s.charAt(countV);
                    countV++;
                }
                c = Integer.parseInt(cV);
            }
        }
        else
        {
            answerAsStr = "Incorrect";
        }
        
        /*if(answerAsStrrr.equals("LEZ GO")) //Doesn't work yet.
        {
            FindFactorAnswers ffa = new FindFactorAnswers(jText, "LEZ GO");
            answerAsStr = ffa.arithAnswer().toString();
        }*/
    }
    
    public Factor(int aValue, int bValue, int cValue)
    {
        a = aValue;
        b = bValue;
        c = cValue;
    }
    
    /**
     * Used to test to see if Factor is applicable for OMGFactor. The int work is equal to 4 if it works. If not, it's 0.
     * @return  work to see if Factor works or not.
     */
    public int doesWork()
    {
        return work;
    }
    
    /**
     * Returns a String of the full answer.
     * @return  answerAsStr which is String of answer.
     */
    public String getStr()
    {
        return answerAsStr;
    }
    
    /**
     * Returns the value given in the parameter as a positive number.
     * @param a     Integer being returned as positive.
     * @return  a positive integer of a.
     */
    public int getValue(int a)
    {
        return Math.abs(a);
    }

    /**
     * Based on if the a is positive or negative, it returns a String of "+" or "-".
     * @param a     Integer being used to see what the sign should be.
     * @return  String of "+" if positive and "-" if negative.
     */
    public String sign(int a)
    {
        if(a >= 0)
        {
            return "+";
        }
        else
        {
            return "-";
        }
    }
    
    /**
     * Returns a String made for BinomialFactor of (x + temp).
     * @param temp  Integer used to create the sign and insert the value.
     * @return  String in (x + temp) form.
     */
    public String toString(int temp)
    {
        return "(x" + sign(temp) + "" + getValue(temp) + ")";
    }

    /**
     * Returns a String made for HardFactor of (ax + b).
     * @param temp  Integer used to insert the first value.
     * @param temp2  Integer used to create the other sign and insert the other value.
     * @return  String in (tempx + temp2) form.
     */
    public String toString(int temp, int temp2)
    {
        return "(" + getValue(temp) + "x" + sign(temp2) + "" + getValue(temp2) + ")";
    }

    /**
     * Returns String made from temp and temp2 to create a term "tempx^temp2" or "tempx".
     * @param temp  Integer used to insert the sign and value of the term.
     * @param temp2  Integer used to insert the degree of the term.
     * @return  String of the term.
     */
    public String makeTerm(int temp, int temp2)
    {
        if(temp2 == 1)
        {
            return "" + sign(temp) + getValue(temp) + "x";
        }
        else
        {
            return "" + sign(temp) + "" + getValue(temp) + "x^" + temp2;
        }
    }
}
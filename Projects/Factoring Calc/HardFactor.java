import java.util.ArrayList;
import javax.swing.*;

public class HardFactor extends Factor
{
    private ArrayList<Integer> firstX = new ArrayList<Integer>();
    private ArrayList<Integer> secondX = new ArrayList<Integer>();
    private ArrayList<Integer> firstReg = new ArrayList<Integer>();
    private ArrayList<Integer> secondReg = new ArrayList<Integer>();
    
    public HardFactor(int aV, int bV, int cV)
    {
        super(aV, bV, cV);
        printWholeThing();
    }
    
    /**
     * Same use as the findXValueBC() in BinomialFactor class. 
     * Finds the a, b, c, and d values in (ax+b)(cx+d) for all the possible combinations that you can 
    get from the a, b, and c values.
     */
    private void findXValueBC() 
    {
        int temp = c;
        int temp2 = a;
        if(c < 0)
        {
            c = -c;
        }
        if(a < 0)
        {
            a = -a;
        }
        
        for(int n = -c; n <= Math.abs(c); n++) //c value
        {
            for(int r = -a; r <= Math.abs(a); r++) //a value
            {
                for(int s = -a; s <= Math.abs(a); s++) //a value
                {
                    for(int j = -c * a; j <= Math.abs(a * -c); j++) //c value
                    {
                        if(n * j == temp && (r * j) + (s * n) == b && r * s == a)
                        {
                            firstX.add(r);
                            firstReg.add(n);
                            secondX.add(s);
                            secondReg.add(j);
                        }
                    }
                }
            }
        }
    }
    
    String tempStr;
    
    /**
     * Returns a string based on the parameters given to create a (ax+b)(cx+d) creation.
     * @param w     Integer being used as a value above.
     * @param x     Integer being used as b value above.
     * @param y     Integer bring used as c value above.
     * @param z     Integer being used as d value above.
     * @return  String of (ax+b)(cx+d)
     */
    private String printIt(int w, int x, int y, int z)
    {
        tempStr = "(" + w + "x " + sign(x) + " " + getValue(x) + ")(" + y + "x " + sign(z) + " " 
            + getValue(z)+ ")";
        tempArrList.add(tempStr);
        return tempStr;
    }
    
    /**
     * Returns a String based on the integers found in the ArrayLists
     * @return  String grabbed from parameters given to printIt() above
     */
    public String printForAns()
    {
        return printIt(firstX.get(firstX.size() - 1), firstReg.get(firstReg.size() - 1), secondX.get(secondX.size() - 1), secondReg.get(secondReg.size() - 1));
    }
    
    /**
     * Finds the values of a, b, c, and d through firstXValueBC().
     * As long as there is a value for a and c, it will use printIt() to add to an ArrayList 
    of possible answers.
     * Then it should display a message of all possible combinations.
     */
    public void printWholeThing()
    {
        findXValueBC();
        if(firstX.size() == 0 || secondX.size() == 0)
        {
            answerAsStr = "Incorrect";
            return;
        }
        
        for(int s = 0; s < firstX.size(); s++)
        {
            printIt(firstX.get(s), firstReg.get(s), secondX.get(s), secondReg.get(s));
            if(s < firstX.size() - 1)
            {
                tempArrList.add("\nor\n");
            }
        }
    }
}
import java.util.ArrayList;
import javax.swing.JTextField;
import javax.swing.JOptionPane;
public class OMGFactor
{
    static ArrayList<String> factored = new ArrayList<String>();
    static ArrayList<String> synD = new ArrayList<String>();
    String equation = "";
    String fullAns = "";
    public OMGFactor(JTextField jText)
    {
        String s = jText.getText();
        System.out.println(s);
        equation = new String(s);
        for(int i = 0; i < s.length(); i++)
        {
            int maxX = -1;
            if(equation.length() > 1)
            {
                maxX = Integer.parseInt("" + equation.charAt(equation.indexOf("x^") + 2));
                System.out.println(maxX);
            }
            if(maxX == -1 || isFactored())
            {
                for(String sdiv : synD)
                {
                    fullAns += sdiv;
                }
                for(String hFac : factored)
                {
                    fullAns += hFac;
                }
                fullAns += equation;
                return;
            }
            else
            {
                if(maxX > 2)
                {
                    SynDivision sy = new SynDivision(equation);
                    synD.add(sy.getAnswerAsString());
                    String eCopy = new String(equation);
                    equation += sy.printRest();
                    equation = equation.replace(eCopy, "");
                }
                else if(maxX == 2)
                {
                    Factor facter = new Factor(new JTextField(equation));
                    factored.add(facter.getStr());
                    String eCopy = new String(equation);
                    equation += "";
                    equation = equation.replace(eCopy, "");
                    ArrayList<String> blelble = new ArrayList<String>();
                    for(int m = 0; m < Factor.tempArrList.size() / 3; m++)
                    {
                        blelble.add(Factor.tempArrList.get(m));
                    }
                    JOptionPane.showMessageDialog(null, blelble, "Possible Answers", JOptionPane.PLAIN_MESSAGE);                    
                    Factor.tempArrList.remove(Factor.tempArrList);
                }
            }
        }
    }
    
    /**
     * Returns the full answer as one String.
     * @return  Full String answer
     */
    public String getFullAns()
    {
        return fullAns;
    }
    
    /**
     * Tests to see if the equation is still factorable. Based on this, it returns true or false.
     * @return  True if it is fully factored and SynDivision and Factor won't work, false otherwise.
     */
    public boolean isFactored()
    {
        boolean[] canBeDone = new boolean[2];
        canBeDone[0] = true;
        canBeDone[1] = true;
        if(equation.equals(""))
        {
            return true;
        }
        if(new SynDivision(equation).getAnswer() == 999999)
        {
            canBeDone[0] = false;
        }
        if(new Factor(new JTextField(equation)).doesWork() == 0 || new Factor(new JTextField(equation)).getStr().equals("Incorrect"))
        {
            canBeDone[1] = false;
        }
        
        if(!canBeDone[0] && !canBeDone[1])
        {
            return true;
        }
        return false;
    }
}
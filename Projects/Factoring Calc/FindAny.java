import javax.swing.*;
import java.util.ArrayList;

public class FindAny
{
    public FindAny(){}

    public FindAny(JTextField s)
    {
        String s1 = s.getText();
        if(s1.indexOf("Factor(") > -1)
        {
            s1 = s1.replace("Factor(", "");
            JTextField jText = new JTextField(s1);
            Calculator.onScreen.removeAll(Calculator.onScreen);
            Charge.screen.setText("");
            Factor fac = new Factor(jText);
            if(fac.getStr().equals("Incorrect"))
            {
                Calculator.onScreen.add("Will Not Factor---->" + fac.copy);
                return;
            }
            String holdS = fac.getStr();
            if(holdS.charAt(holdS.indexOf("x") - 1) != '(')
            {
                ArrayList<String> blelble = new ArrayList<String>();
                for(int m = 0; m < Factor.tempArrList.size(); m++)
                {
                    blelble.add(Factor.tempArrList.get(m));
                }
                JOptionPane.showMessageDialog(null, blelble, "Possible Answers", JOptionPane.PLAIN_MESSAGE);
            }
            Factor.tempArrList.remove(Factor.tempArrList);
            Calculator.onScreen.add(fac.getStr());
        }
        else if(s1.indexOf("Factor All(") > -1)
        {
            s1 = s1.replace("Factor All(", "");
            JTextField jText = new JTextField(s1);
            Calculator.onScreen.removeAll(Calculator.onScreen);
            Charge.screen.setText("");
            OMGFactor omg = new OMGFactor(jText);
            Calculator.onScreen.add(omg.getFullAns());
        }
        else if(s1.indexOf("Syn Div(") > -1)
        {
            s1 = s1.replace("Syn Div(", "");
            JTextField jText = new JTextField(s1);
            Calculator.onScreen.removeAll(Calculator.onScreen);
            Charge.screen.setText("");
            SynDivision syn = new SynDivision(jText);
            if(syn.getAnswerAsString().equals("(x - 999999)"))
            {
                Calculator.onScreen.add("WIll not work" + "--->" + syn.printRest());
                return;
            }
            Calculator.onScreen.add(syn.getAnswerAsString() + syn.printRest());
            JOptionPane.showMessageDialog(null, "The zero is : " + syn.getAnswer(), "Synthetic Division", JOptionPane.PLAIN_MESSAGE);
        }
        /*else if(s1.indexOf("Get Zeroes(") > -1) //Not quite finished
        {
            s1 = s1.replace("Get Zeroes(", "");
            JTextField jText = new JTextField(s1);
            Calculator.onScreen.removeAll(Calculator.onScreen);
            Charge.screen.setText("");
            FindFactorAnswers ffa = new FindFactorAnswers(jText, "LEZ GO");
            if(s1.charAt(s1.indexOf("^2") + 2) == '2')
            {
                Calculator.onScreen.add(ffa.getStr());
            }
        }*/
        else
        {
            Calculator.onScreen.removeAll(Calculator.onScreen);
            Charge.screen.setText("");
            Calculator.onScreen.add("This doesn't work...");
        }
    }
}

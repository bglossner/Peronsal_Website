import javax.swing.*;

public class PossButtons
{
    private JButton jbCalled;
    int i = 4;
    public PossButtons(JButton a)
    {
        jbCalled = a;
        number();
    }

    /**
     * Adds certain String to onScreen according to the JButton pressed.
     */
    public void number()
    {   
        if(jbCalled.getText().equals(BPad.xvar.getText())){Calculator.onScreen.add("x"); return;}
        if(jbCalled.getText().equals(BPad.squared.getText())){Calculator.onScreen.add("^2"); return;}
        if(jbCalled.getText().equals(BPad.factor.getText())){Calculator.onScreen.add("Factor("); return;}
        if(jbCalled.getText().equals(BPad.go.getText())){new FindAny(Charge.screen);
            Calculator.onScreen.add("going");return;}
        if(jbCalled.getText().equals(BPad.minus.getText())){Calculator.onScreen.add("-"); return;}
        if(jbCalled.getText().equals(BPad.plus.getText())){Calculator.onScreen.add("+"); return;}
        if(jbCalled.getText().equals(BPad.delete.getText())){Calculator.onScreen.add("del"); return;}
        if(jbCalled.getText().equals(BPad.multiply.getText())){Calculator.onScreen.add("*"); return;}
        if(jbCalled.getText().equals(BPad.divide.getText())){Calculator.onScreen.add("/"); return;}
        if(jbCalled.getText().equals(BPad.syndiv.getText())){Calculator.onScreen.add("Syn Div("); return;}
        if(jbCalled.getText().equals(BPad.instructions.getText())){Calculator.onScreen.add("Instructions"); new Instructions(); 
             return;}
        if(jbCalled.getText().equals(ChargeButtons.isCon.getText())){Calculator.onScreen.add("Now is charging"); Charge.connection = "yes";return;}
        if(jbCalled.getText().equals(ChargeButtons.notCon.getText())){Calculator.onScreen.add("Now isn't charging"); Charge.connection = "no"; return;}
        if(jbCalled.getText().equals(ChargeButtons.chargeSym.getText())){Calculator.onScreen.add("Charge");
            JOptionPane.showMessageDialog(null, "Current Charge is: " + Charge.charge, "Oatmeal", JOptionPane.INFORMATION_MESSAGE); return;}
        if(jbCalled.getText().equals(BPad.blankExp.getText())){Calculator.onScreen.add("^"); return;}
        if(jbCalled.getText().equals(BPad.factorAll.getText())){Calculator.onScreen.add("Factor All("); return;}
        if(jbCalled.getText().equals(BPad.getZeroes.getText())){Calculator.onScreen.add("Get Zeroes("); return;}
        for(i = 0; i < 10; i++)
        {           
            if((jbCalled.getText().equals(BPad.one.getText()) ||
            jbCalled.getText().equals(BPad.two.getText()) || 
            jbCalled.getText().equals(BPad.three.getText()) || 
            jbCalled.getText().equals(BPad.four.getText()) || 
            jbCalled.getText().equals(BPad.five.getText()) ||
            jbCalled.getText().equals(BPad.zero.getText()) ||
            jbCalled.getText().equals(BPad.nine.getText()) ||
            jbCalled.getText().equals(BPad.eight.getText()) ||
            jbCalled.getText().equals(BPad.seven.getText()) ||
            jbCalled.getText().equals(BPad.six.getText())) &&
            Integer.parseInt(jbCalled.getText()) == i)
            {
                Calculator.onScreen.add("" + i);
                return;
            }
        }
        
        Calculator.onScreen.add("Clearing");
    }
}
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.util.ArrayList;

public class BPad extends Charge implements ActionListener
{
    static JButton xvar, factor, go, squared, one, two, three, four, five, six, seven, eight, nine, zero, 
    parenthesis, clear, minus, plus, multiply, divide, delete, syndiv, instructions, blankExp, factorAll, getZeroes;
    static ArrayList<JButton> buttons = new ArrayList<JButton>();
    static ArrayList<Equation> eqs = new ArrayList<Equation>();
    public BPad()
    {
        one = new JButton("1");
        buttons.add(one);
        two = new JButton("2");
        buttons.add(two);
        three = new JButton("3");
        buttons.add(three);
        four = new JButton("4");
        buttons.add(four);
        five = new JButton("5");
        buttons.add(five);
        six = new JButton("6");
        buttons.add(six);
        seven = new JButton("7");
        buttons.add(seven);
        eight = new JButton("8");
        buttons.add(eight);
        nine = new JButton("9");
        buttons.add(nine);
        zero = new JButton("0");
        buttons.add(zero);
        go = new JButton("Go!");
        buttons.add(go);
        plus = new JButton("+");
        buttons.add(plus);
        minus = new JButton("---");
        buttons.add(minus);
        multiply = new JButton("*");
        buttons.add(multiply);
        divide = new JButton("/");
        buttons.add(divide);
        xvar = new JButton("x");
        buttons.add(xvar);
        squared = new JButton("^2");
        buttons.add(squared);
        blankExp = new JButton("x^?");
        buttons.add(blankExp);
        clear = new JButton("Clear");
        buttons.add(clear);
        delete = new JButton("Del");
        buttons.add(delete);
        factor = new JButton("Factor");
        buttons.add(factor);
        syndiv = new JButton("SynDiv");
        buttons.add(syndiv);
        factorAll = new JButton("Factor All");
        buttons.add(factorAll);
        getZeroes = new JButton("Get Zeroes. NO WORKS");
        buttons.add(getZeroes);
        ChargeButtons cb = new ChargeButtons();
        instructions = new JButton("?\n\n?");
        buttons.add(instructions);
        for(JButton a : buttons)
        {
            a.addActionListener(this);
        }
    }
    
    /**
     * From the implemented class ActionListener.
     * Checks up on the charge of the calculator, and based on that, will continue on with the method
     or will show a message to the user reporting if the charge is either under 15 as a warning, or if
     at 0 it will display a warning and the calculator will no longer function. If above 0, the
     calculator will display whatever it receives from onScreen and will set the screen's text to
     whatever it's asked of, depending on the received text.
     * @param e      ActionEvent performed. What button is pressed.
     */
    public void actionPerformed(ActionEvent e)
    {
        //System.out.println(e);
        isCharging();
        if(!isOn())
        {
           JOptionPane.showMessageDialog(null, "Error: No charge. Please connect to charger and try again", "Oatmeal",
           JOptionPane.ERROR_MESSAGE);
           return;
        }
        else if(charge <= 15 && connection.equals("no"))
        {
           JOptionPane.showMessageDialog(null, "Low charge", "Oatmeal", JOptionPane.WARNING_MESSAGE);
        }
        JButton b = (JButton)e.getSource();
        PossButtons pb = new PossButtons(b);
        int size = onScreen.size();
        String s = onScreen.get(onScreen.size() - 1);
        if(s.equals("del"))
        {
            if(onScreen.size() - 1 != 0)
            {
                String s1 = onScreen.remove(onScreen.size() - 2);
                int sSize = s1.length();
                screen.setText(screen.getText().substring(0, screen.getText().length() - sSize));
                onScreen.remove(onScreen.size() - 1);
            }
            else
            {
                onScreen.remove(onScreen.size() - 1);
            }
        }
        else if(s.equals("going"))
        {
            screen.setText(onScreen.get(size - 2));
            onScreen.remove(size - 1);
        }
        else if(s.equals("Instructions"))
        {
            onScreen.remove(size - 1);
        }
        else
        {
            screen.setText(screen.getText() + s);
        }
        
        if(s.equals("Clearing"))
        {
            screen.setText("");
            onScreen.removeAll(onScreen);
        }
    }
}
import javax.swing.*;

public class Instructions
{
    public Instructions()
    {
        String[] obj = {"1", "2", "3", "4", "5"};
        Object s = JOptionPane.showInputDialog(null, makeContentDescription(), "Instructions for Oatmeal", 
                                    JOptionPane.INFORMATION_MESSAGE, null, obj, 900);
        makeInstructions(s);
    }
    
    /**
     * Creates the instructions based on which input is selected in the JOptionPane represented by tempStr
     * @param tempStr   Object being chosen in the JOptionPane
     */
    public void makeInstructions(Object tempStr)
    {
        String s = (String)tempStr;
        if(s == null)
        {
            return;
        }
        switch(Integer.parseInt(s))
        {
            case 1:
            {
                JOptionPane.showMessageDialog(null, "This calculator DOES NOT do anything that has nothing to do with functions.\n -This means the division and" + 
                                              " multiplication signs are useless, and if the function has no x-variable,\nthen the program won't work as intended." + 
                                              "\n-You must use one of the buttons to set up the function correctly. It should look like: -Factor('function'-.\n" + 
                                              "-Factor(- can be exchanged with other button.",
                                             "General Info", JOptionPane.INFORMATION_MESSAGE);
                                             return;
            }
            case 2:
            {
                JOptionPane.showMessageDialog(null, "Press this button to create be able to input a custom exponent",
                                             "x^?", JOptionPane.INFORMATION_MESSAGE);
                                             return;
            }
            case 3:
            {
                JOptionPane.showMessageDialog(null, "This buttons is used to factor a certain function\n -You must" + 
                                              " the correct syntax.\n\n 1. Clear anything on the screen\n2. Press" + 
                                              "the 'Factor' key. This must be the first thing on the screen.\n3. " +
                                              "Put your equation in the correct format. You must have at least an x^2" +
                                              " and two terms. All numbers must be before an x and in chronological order" +
                                              "\nIt should be like: x^2 - 4 - or - x^3 + x^2 - 8x + 3",
                                             "Factor", JOptionPane.INFORMATION_MESSAGE);
                                             return;
            }
            case 4:
            {
                JOptionPane.showMessageDialog(null, "This is for doing synthetic division. Use the same syntax as Factor.",
                                              "Synthetic Division", JOptionPane.INFORMATION_MESSAGE);
                return;
            }
            case 5:
            {
                JOptionPane.showMessageDialog(null, "This is used to factor the function down as much as possible using all available methods.",
                                              "Factor All", JOptionPane.INFORMATION_MESSAGE);
            }
        }
    }
    
    /**
     * Returns the String below that creates the possible choices for the options listed in the JOptionPane
     * @return String of description
     */
    public String makeContentDescription()
    {
        return "Welcome to the instructions for Oatmeal.\n\nOption 1 - How to use: General Info\n Option 2 - x^?\n Option 3 - Factor\n Option 4 - SynDin\n Option 5 - Factor All";
    }
}
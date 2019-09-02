import javax.swing.*;

public class FindFactorAnswers extends Factor
{
    public FindFactorAnswers(JTextField jText, String strr)
    {
        super(jText, strr);
    }
    
    /**
     * Returns integer answer(s) based on the a, b, and c values put into QuadFunc by using the quadratic equation.
     * @return      QuadFunc of answers.
     */
    public QuadFunc arithAnswer()
    {
        return new QuadFunc(a, b, c);
    }
}
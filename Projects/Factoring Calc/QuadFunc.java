public class QuadFunc extends Factor//implements Comparable<QuadFunc>
{   
    double[] arr = new double[2];
    public QuadFunc(int aV, int bV, int cV)
    {
        super(aV, bV, cV);       
    }
    
    /**
     * Sets both array elements to the first answer and second answer, if possible.
     */
    public void solve()
    {
        if((double)Math.sqrt(Math.pow(b, 2) - (4 * a * c)) > 0)
        {
            double firstNum = (-b + ((double)Math.sqrt(Math.pow(b, 2) - (4 * a * c)))) / (double)(2 * a);
            double secondNum = (-b - ((double)Math.sqrt(Math.pow(b, 2) - (4 * a * c)))) / (double)(2 * a);
            arr[0] = firstNum; 
            arr[1] = secondNum;
        }
        else if((double)Math.sqrt(Math.pow(b, 2) - (4 * a * c)) == 0)
        {
            double num = (-b + (Math.sqrt(Math.pow(b, 2) - (4 * a * c)))) / (2 * a);
            arr[0] = num;
            arr[1] = 999999;
        }
        else
        {
            arr[0] = 999999;
        }
    }
    
    /**
     * Returns a String for the calculator based on how many possible answers there can be: 0, 1, or 2
     * @return  String of possible answer(s)
     */
    public String toString()
    {
        if(arr[0] != 999999 && arr[1] != 999999)
        {
            return "" + arr[0] + ", " + arr[1];
        }
        else if(arr[1] == 999999)
        {
            return "" + arr[0];
        }
        else
        {
            return "No real answers";
        }
    }
}
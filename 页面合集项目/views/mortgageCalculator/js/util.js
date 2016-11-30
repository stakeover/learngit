var loanTool = {
    // 计算月还款金额(本息)
    /**
     *
     * @param loan          本金(比如，从银行贷款70万)
     * @param months        还款月数(比如，贷款20年，还款月数为240)
     * @param interest      年利率
     *
     * @return payPerMonth  函数执行后，返回的计算结果(月还款金额:本金+利息)
     */
    getPayPerMonth:function(loan,months,interest){
        var payPerMonth = 0;    // 月还款本息

        // step1: 计算月利率
        // 月利率=年利率÷12=0.0665÷12=0.005541667
        var interestPerMonth = interest/12;

        // step2: 计算月还款本息
        // 月还款本息=〔贷款本金×月利率×（1＋月利率）＾还款月数〕÷〔（1＋月利率）＾还款月数－1〕
        payPerMonth = (loan * interestPerMonth * Math.pow((1 + interestPerMonth),months))/(Math.pow((1 + interestPerMonth),months) - 1);

        return payPerMonth;
    }
};
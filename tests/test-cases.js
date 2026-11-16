// Same test cases used by browser tests.html and Node CLI test.
const PAYOFF_TEST_CASES=[
 ['Long Call / 價內','long_call',100,5,110,5],
 ['Short Call / 價內','short_call',100,5,110,-5],
 ['Long Put / 價內','long_put',100,5,90,5],
 ['Short Put / 價內','short_put',100,5,90,-5],
 ['Long Call / 價外','long_call',100,5,90,-5],
 ['Long Put / 價外','long_put',100,5,110,-5],
 ['Long Call / 損益兩平','long_call',100,5,105,0],
 ['Short Call / 損益兩平','short_call',100,5,105,0],
 ['Long Put / 損益兩平','long_put',100,5,95,0],
 ['Short Put / 標的價格為 0','short_put',100,5,0,-95],
 ['Long Put / 標的價格為 0','long_put',100,5,0,95],
 ['Short Call / 價外收權利金','short_call',100,5,80,5],
 ['Short Put / 價外收權利金','short_put',100,5,110,5],
 ['Long Call / 價平','long_call',100,5,100,-5],
];
if(typeof module==='object'&&module.exports){module.exports=PAYOFF_TEST_CASES;}

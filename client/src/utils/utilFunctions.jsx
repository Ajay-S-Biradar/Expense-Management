export const groupByYear =async (data)=>{
    let res={};
    let years=[];
    await data.map((item)=>{
        const {year} = item ;
        if(!res[year]){
            years.push(year);
            res[year] = [];
        }
        res[year].push(item);
    })

    return { years, res};
}

export const getLineChartData = async ()=>{
    const lineChartData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
        ],
        datasets: [
            {
                label:"Incomes",
                // fill:true,
                data:[2000,3000,6000,3500,10500,2000,1000,4000,3200,4300,2300,7800],
                borderColor: "#f3b3f3",
                hoverBorderWidth:2,
                backgroundColor:"#a7b8c9",
            },
            {
                label:"Expenses",
                data:[200,300,600,350,1500,200,100,400,200,400,230,780],
                borderColor: "#f7b8b9",
                backgroundColor:"tomato",
                hoverBorderWidth:2,
            },
        ],
    }
    return lineChartData;
}

export function trimTrailingZeros(arr) {
    while (arr.length > 0 && arr[arr.length - 1] === 0) {
      arr.pop();  // Remove the last element if it is zero
    }
    return arr;
}
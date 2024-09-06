export const lineChartData = {
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

export const LineOptions =  {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: ''
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          display:true
        },
      }
    }
  }

  export const PieChartdata = {
    labels:["Income", "Expense"],
    datasets: [
      {
        label: "Amount Spent",
        data : [10000, 2000],
        backgroundColor: [
          "blue",
          "red"
        ],
        hoverOffset:10,
      }
    ]
  }

  export const PieOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Title',
      position: 'bottom',
      fontSize: 15,
      fontColor: '#000000'
    },
    legend: {
      display: false
    },
    radius:"85%"
}
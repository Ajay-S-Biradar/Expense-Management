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
            data:[2000,3000,6000,3500,10500,2000,1000,4000,3200,4300,2300,7800],
            borderColor: "#f3b3f3",
            hoverBorderWidth:2,
            backgroundColor:"#a7b8c9",
            fill:true
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
        text: 'Grid Line Settings'
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
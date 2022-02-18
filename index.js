const cardWrapper = document.getElementById("card-wrapper");
const tableBody = document.getElementById("table-body");

const baseurl = 'https://jsonplaceholder.typicode.com/comments';

const fetchingData = async () => {
    try {
        const query = await fetch(baseurl);
        const response = await query.json();
        return response;
    } catch (error) {
        console.log(error)
    }
}

function draw(randomNumbers) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    
    // Colors
    var colors = ['red', 'green', 'yellow', 'black', 'purple', 'blue', 'pink', 'orange', 'cyan', 'magenta', 'darkblue', 'rose', 'violet','brown', 'gray', 'silver', 'salmon', 'chocolate', 'navy', 'teal'  ];
    
    
    // store beginning angle and ending angle 
    var beginAngle = 0;
    var endAngle = 0;
    // data input 
    var data = randomNumbers
    var total = 0;
    //sum of data
    for (i = 0; i < data.length; i++) {
        total = total + data[i];
    }

    // Iterate through the angles
    for (var i = 0; i < data.length; i = i + 1) {
        beginAngle = endAngle; //begin angle
        endAngle = endAngle + ((Math.PI * 2) * (data[i] / total)); //end angle
    
        ctx.beginPath();
        // Fill color
        ctx.fillStyle = colors[i];
        //create each arc of the pie chart
        ctx.moveTo(300, 300);
        ctx.arc(300, 300, 220, beginAngle, endAngle);
        ctx.lineTo(300, 300);
        ctx.stroke();
        ctx.fill()
    
        // Set Text
        var pieRadius = Math.min(ctx.canvas.width / 2, ctx.canvas.height / 2);
        var labelX = ctx.canvas.width / 2 + (pieRadius / 2) * Math.cos(beginAngle + (endAngle - beginAngle) / 2);
        var labelY = ctx.canvas.height / 2 + (pieRadius / 2) * Math.sin(beginAngle + (endAngle - beginAngle) / 2)
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.fillText(data[i], labelX, labelY);
        // Fill
    }
}

const randomNumbers = Array.from({length: 20}, () => Math.floor(Math.random() * 100));
console.log(randomNumbers)

const renderingComments = async () => {
    const data = await fetchingData();
    const filteredList = data.filter((item, index) => index < 20);
    let newList = "" 
    let newTable = ""

    filteredList.map((item, index) => {

        const view = Math.floor(Math.random() * 100);
        
        draw(randomNumbers)

        const newArray = [{...item, "view" : view}]
        console.log(view)

        newArray.forEach(({name, body, postId, email, view}) => {
            let textnode = `
                <div class="card">
                    <div class="user">
                        <img src="/img.png" width="60px" height="60px" alt="user">
                        <div class="detail">
                            <h5>${name}</h5>
                            <div class="info">
                                <p class="email">${email}</p>
                                
                            </div>
                        </div>     
                    </div>
                    <div class="content">
                        
                        <p>${body}</p>
                        <div class='view'>
                            <img src="/eye.png" width="20px" height="20px" alt="view">
                            <p>${view}</p>
                        </div>
                    </div>
                </div>
             `
            newList += textnode;
        });

        newArray.forEach(({name, body, postId, email, view}) => {
            let textnode = `
                <tr>
                    <td>${name}</td>
                    <td>${body}</td>
                    <td>${email}</td>
                    <td>${postId}</td>
                    <td>${view}</td>
                </tr>
            `
            newTable += textnode
        })
    })

    cardWrapper.insertAdjacentHTML("beforeend", newList);
    tableBody.innerHTML = newTable;
}
renderingComments();

function BarChart(config) {  
    // user defined properties  
    this.canvas = document.getElementById(config.canvasId);  
    this.data = config.data;  
    this.color = config.color;  
    this.barWidth = config.barWidth;  
    this.gridLineIncrement = config.gridLineIncrement;  

    this.maxValue = config.maxValue - Math.floor(config.maxValue % this.gridLineIncrement);  
    this.minValue = config.minValue;  

    // constants  
    this.font = "12pt Calibri";  
    this.axisColor = "#555";  
    this.gridColor = "black";  
    this.padding = 10;  

    // relationships  
    this.context = this.canvas.getContext("2d");  
    this.range = this.maxValue - this.minValue;  
    this.numGridLines = this.numGridLines = Math.round(this.range / this.gridLineIncrement);  
    this.longestValueWidth = this.getLongestValueWidth();  
    this.x = this.padding + this.longestValueWidth;  
    this.y = this.padding * 2;  
    this.width = this.canvas.width - (this.longestValueWidth + this.padding * 2);  
    this.height = this.canvas.height - (this.getLabelAreaHeight() + this.padding * 4);  

    // draw bar chart  
    this.drawGridlines();  
    this.drawYAxis();  
    this.drawXAxis();  
    this.drawBars();  
    this.drawYVAlues();  
    this.drawXLabels();  
}  

BarChart.prototype.getLabelAreaHeight = function () {  
    this.context.font = this.font;  
    var maxLabelWidth = 0;  

    for (var n = 0; n < this.data.length; n++) {  
        var label = this.data[n].label;  
        maxLabelWidth = Math.max(maxLabelWidth, this.context.measureText(label).width);  
    }  

    return Math.round(maxLabelWidth / Math.sqrt(2));  
};  

BarChart.prototype.getLongestValueWidth = function () {  
    this.context.font = this.font;  
    var longestValueWidth = 0;  
    for (var n = 0; n <= this.numGridLines; n++) {  
        var value = this.maxValue - (n * this.gridLineIncrement);  
        longestValueWidth = Math.max(longestValueWidth, this.context.measureText(value).width);  

    }  
    return longestValueWidth;  
};  

BarChart.prototype.drawXLabels = function () {  
    var context = this.context;  
    context.save();  
    var data = this.data;  
    var barSpacing = this.width / data.length;  

    for (var n = 0; n < data.length; n++) {  
        var label = data[n];  
        context.save();  
        context.translate(this.x + ((n + 1 / 2) * barSpacing), this.y + this.height + 10);  
        context.rotate(-1 * Math.PI / 4); // rotate 45 degrees  
        context.font = this.font;  
        context.fillStyle = "black";  
        context.textAlign = "right";  
        context.textBaseline = "middle";  
        context.fillText(label, 0, 0);  
        context.restore();  
    }  
    context.restore();  
};  

BarChart.prototype.drawYVAlues = function () {  
    var context = this.context;  
    context.save();  
    context.font = this.font;  
    context.fillStyle = "black";  
    context.textAlign = "right";  
    context.textBaseline = "middle";  

    for (var n = 0; n <= this.numGridLines; n++) {  
        var value = this.maxValue - (n * this.gridLineIncrement);  
        var thisY = (n * this.height / this.numGridLines) + this.y;  
        context.fillText(value, this.x - 5, thisY);  
    }  

    context.restore();  
};  

BarChart.prototype.drawBars = function () {  
    var context = this.context;  
    context.save();  
    var data = this.data;  
    var barSpacing = this.width / data.length;  
    var unitHeight = this.height / this.range;  

    for (var n = 0; n < data.length; n++) {  
        var bar = data[n];  
        var barHeight = (data[n] - this.minValue) * unitHeight;  

        if (barHeight > 0) {  
            context.save();  
            context.translate(Math.round(this.x + ((n + 1 / 2) * barSpacing)), Math.round(this.y + this.height));  
             
            context.scale(1, -1);  

            context.beginPath();  
            context.rect(-this.barWidth / 2, 0, this.barWidth, barHeight);  
            context.fillStyle = this.color;  
            context.fill();  
            context.restore();  
        }  
    }  
    context.restore();  
};  

BarChart.prototype.drawGridlines = function () {  
    var context = this.context;  
    context.save();  
    context.strokeStyle = this.gridColor;  
    context.lineWidth = 2;  

    // draw y axis grid lines  
    for (var n = 0; n < this.numGridLines; n++) {  
        var y = (n * this.height / this.numGridLines) + this.y;  
        context.beginPath();  
        context.moveTo(this.x, y);  
        context.lineTo(this.x + this.width, y);  
        context.stroke();  
    }  
    context.restore();  
};  

BarChart.prototype.drawXAxis = function () {  
    var context = this.context;  
    context.save();  
    context.beginPath();  
    context.moveTo(this.x, this.y + this.height);  
    context.lineTo(this.x + this.width, this.y + this.height);  
    context.strokeStyle = this.axisColor;  
    context.lineWidth = 2;  
    context.stroke();  
    context.restore();  
};  

BarChart.prototype.drawYAxis = function () {  
    var context = this.context;  
    context.save();  
    context.beginPath();  
    context.moveTo(this.x, this.y);  
    context.lineTo(this.x, this.height + this.y);  
    context.strokeStyle = this.axisColor;  
    context.lineWidth = 2;  
    context.stroke();  
    context.restore();  
};  

window.onload = function () {  
    // var data = [{  
    //     label: "Eating",  
    //     value: 2  
    // }, {  
    //     label: "Working",  
    //     value: 8  
    // }, {  
    //     label: "Sleeping",  
    //     value: 8  
    // }, {  
    //     label: "Playing",  
    //     value: 2  
    // }, {  
    //     label: "Entertainment",  
    //     value: 4  
    // }];  

    new BarChart({  
        canvasId: "myCanvasBar",  
        data: randomNumbers,
        color: "grey",  
        barWidth: 40,  
        minValue: 0,  
        maxValue: 100,  
        gridLineIncrement: 20  
    });  
};  

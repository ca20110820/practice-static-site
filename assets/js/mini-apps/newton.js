document.addEventListener('click', function(event){

    let expression = document.querySelector('#newton-inp').value;

    if (event.target.matches('#cmd-simplify')) {
		console.log('Simplifying ...');
        getNewtonResult('simplify', expression);
	}
    else if (event.target.matches('#cmd-factor')) {
        console.log('Factoring ...');
        getNewtonResult('factor', expression);
    }
    else if (event.target.matches('#cmd-derive')) {
        console.log('Calculating Derivative ...');
        getNewtonResult('derive', expression);
    }
});

function getNewtonResult(cmd, expr) {
    console.log(cmd);
    console.log(expr);

    let expr_ = encodeURIComponent(expr);
    let url = `https://newton.now.sh/api/v2/${cmd}/${expr_}`;
    console.log(url);

    // let response = await fetch(url);
    // let data = await response.json();
    // let output = document.querySelector('#newton-output');
    // output.innerHTML = null;
    // output.innerHTML = data['result'];

    fetch(url)
    .then(function(response){
        if (response.ok) {
            return response.json()
        }
        throw new Error('There was an error');
    }).then(function(data){
        let output = document.querySelector('#newton-output');
        output.innerHTML = null;
        output.innerHTML = data['result'];
    }).catch(function(error){
        console.error(error);
    });
}

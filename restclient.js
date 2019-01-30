// Quick and dirty REST interface
function RESTClient (url) {
    var isInternetExplorer = 'ActiveXObject' in window;

    function getRequest() {
        if (isInternetExplorer) {
            return new ActiveXObject('Msxml2.XMLHTTP');
        }
        return new XMLHttpRequest();
    }

    function sendRequest(xhr, param, success, failure) {
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Parse response
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var result = isInternetExplorer
                        ? JSON.parse(xhr.responseText)
                        : xhr.response;

                    success(result);
                } else {
                    failure(xhr.statusCode + ': ' + xhr.statusMessage);
                }
            }
        }
        xhr.send(JSON.stringify(params));
    }

    function setUrl(param) {
        return url + '/' + param[controller] + '/' + param[id];
    }

    this.head = function (param, success, failure) {
        var xhr = getRequest();
        xhr.open('HEAD', setUrl(param), true);
        sendRequest(xhr, param, success, failure);
    }

    this.get = function(param, success, failure) {
        var xhr = getRequest();
        xhr.open('GET', setUrl(param), true);
        sendRequest(xhr, param, success, failure);
    }

    this.post = function(param, success, failure) {
        var xhr = getRequest();
        xhr.open('POST', setUrl(param), true);
        sendRequest(xhr, param, success, failure);
    }

    this.put = function(param, success, failure) {
        var xhr = getRequest();
        xhr.open('PUT', setUrl(param), true);
        sendRequest(xhr, param, success, failure);
    }

    this.delete = function(param, success, failure) {
        var xhr = getRequest();
        xhr.open('DELETE', setUrl(param), true);
        sendRequest(xhr, param, success, failure);
    }

}
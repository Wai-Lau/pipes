function updateUserPosition(position) {
    if (CURRENT_POSITION.lat != position.lat && CURRENT_POSITION.lng != position.lng) {
        $.ajax({
            url: "http://localhost:3000/moves",
            method: "POST",        
            data: {
                move : {
                    content: position,
                    game_id: "lol"
                }
            },
            contentType: "multipart/form-data",
            success: function(data){
                console.log(data);
            },
            error: function(errMsg) {
                alert(JSON.stringify(errMsg));
            }
        });
    }
}
//新增跳转的链接
document.getElementById("add_button").onclick = function () {
    window.location.href = '/admin/addpage'
}

//搜索商品
$(function () {
    $(".search").click(function () {
        let message = document.getElementById("queryInput").value
        $.ajax({
            type: "post",
            url: "/admin/shop/" + message,
            success: function (data) {
                document.getElementById("iUser").innerHTML = data.map((i, ind) =>
                    ` <tr>
                <td>${i.goods_name}</td>
                <td>${i.goods_brief}</td>
                <td>${i.goods_images}</td>
                <td>${i.goods_oldprice}</td>
                <td>${i.goods_newprice}</td>
                <td>${i.goods_createtime}</td>
                <td>
                     <input type="button" value="删除" class="del_button" data-id=${ind}/>
                
                     <input type="button" value="修改" class="upd_button" data-id=${ind}/>
                </td>
                </tr>
                `).join("");
            }
        })
    })
});

//删除商品
Array.from($('.del')).forEach(i =>
    i.onclick = function () {
        let id = i.getAttribute('data-id')
        $.ajax({
            url: "/admin/shop/del/" + id,
            type: "DELETE",
            success: function (data) {
                if (data == '成功删除') {
                    alert('成功删除')
                    $(i).parent().parent().remove()
                }
            }
        })
    })

//商品的修改
Array.from(document.getElementsByClassName('update')).forEach(i => {
    i.onclick = function () {
        let ind = this.getAttribute('data-id1')
        window.location.href = '/admin/shop/update/' + ind
    }
})
$(function() {

  var search_list = $(".listview.js-lazy-load-images");

  function appendProduct(product) {
    var html = `<li>
                   <a class="listview__element--right-icon" href="/products/${ product.id }/reviews/new" title="${ product.title }">
                     <div class="position-right p1em">
                       <i class="icon-chevron-right color-sub"></i>
                     </div>
                     <div class="row no-space-bottom">
                       <div class="col2">
                         <div class="thumbnail thumbnail--movies">
                           <div class="thumbnail__figure" style="background-image: url(${ product.image });" title="${ product.title }"></div>
                         </div>
                       </div>
                       <div class="col6 push6">
                         <h3 class="text-middle text-break">
                           <span class="color-sub">${ product.title }</span>
                         </h3>
                         <p class="text-xsmall text-overflow">
                           ${ product.detail }
                         </p>
                       </div>
                     </div>
                   </a>
                 </li>`
                 search_list.append(html);
   }
// appendProduct関数の中身

function appendErrMsgToHTML(msg) {
  var html = `<li>
                <div class='listview__element--right-icon'>${ msg }</div>
              </li>`
  search_list.append(html);
}

  $(".search__query").on("keyup", function() {
    var input = $(".search__query").val();
    // .search__queryクラスのテキストフィールドがkeyupした時、テキストフィールドの文字を取得して変数inputに代入する
    $.ajax({
      type: 'GET',
      url: '/products/search',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(products) {
      // 配列型で帰ったきた情報がproductsに代入
      $(".listview.js-lazy-load-images").empty();
      // 検索したのリストの映画情報を一旦削除
      if (products.length !== 0) {
        products.forEach(function(product){
          appendProduct(product);
          // productsが空でない場合、forEachメソッドでproductsの中身の数だけappendProduct関数を呼び出す
        });
      }
      else {
        appendErrMsgToHTML("一致する映画はありません");
      }
    })
    .fail(function() {
      alert('映画検索に失敗しました');
    })
  });
});
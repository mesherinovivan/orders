// widget configuration
var renderDropCategories = function(event) {
    console.log(event);
}

var grid =  {
        name: 'orders_grid',
        method:'GET',
        url:{
            get  :API_ORDER_GET_URL,
        },
        markSearch: true,
        autoLoad: false,

        show: {
            toolbar: true,
            footer: true,
            toolbarDelete: true,
            toolbarAdd: true,
            toolbarEdit: true,
            footer : true,
        },
        columns: [


            { field: 'number', caption: 'Номер заказа', size: '33%', sortable: true, searchable: true },
            { field: 'account_name', caption: 'Контрагент', size: '120px'},
            { field: 'order_date', caption: 'Дата заказа', type: 'date' , size: '33%', sortable: true},
            { field: 'price', caption: 'Стоимость', size: '120px'},
            { field: 'text', caption: 'Текст', size: '120px'}
        ],
        searches: [

            { field: 'number', caption: 'Номер заказа', type:'text'},
            { field: 'order_date', type: 'date', caption: 'Дата заказа'},
            { field: 'price', caption: 'Стоимость', type:'text'}

        ],
        parser: function (responseText) {

          var data = $.parseJSON(responseText);

          $.each(data,function (item) {
              data[item]['recid'] = data[item].id
          })
          return data;
        },
        onAdd: function(event) {
            ////
            let width = 400
            w2popup.open({
                style:    "padding:8px;",
                title:'Создание заказа',
                showClose: true,
                width: width,
                height: 330,
                body    : '<div id="newtrans" style="height:100%"></div>',
                onOpen  : function (event) {
                    event.onComplete = function () {
                        $('#w2ui-popup #newtrans').w2render('orders_form');

                    };
                },

            });
            ////
        },
        onDelete: function(event) {
            event.preventDefault();
            let recid = w2ui.orders_grid.getSelection();
            debugger;
            $.ajax({
              method: "DELETE",
              url: API_ORDER_DELETE_URL.replace('(\d+)',recid[0]),

              data: {
                  id : recid[0]
              }

            }).done(function( msg ) {
                w2ui.orders_grid.message('Заказ удален', {
                    width: 300,
                    height: 150,
                    body: '<div class="w2ui-centered">Заказ удален</div>',

                });
                w2ui.orders_grid.reload();

            }).error(function () {
                w2ui.orders_grid.message('При удалении заказа произошла ошибка', {
                    width: 300,
                    height: 150,
                    body: '<div class="w2ui-centered">Заказ удален</div>',

                });

            });

        },
        onEdit: function(event) {
            w2popup.open({
                style:    "padding:8px;",
                title:'Редактировать счёт',
                showClose: true,
                width:400,
                height: 330,
                body    : '<div id="order_edit"></div>',
                onOpen  : function (event) {
                    event.onComplete = function () {
                        let curRec = w2ui.orders_grid.get(w2ui.orders_grid.getSelection()[0]);
                        w2ui.orders_form_edit.record = {
                            'number': curRec['number'],
                            'order_date': curRec['order_date'],
                            'recid': curRec['recid'],
                            'account': {id: curRec.account_id, text: curRec.account_name},
                            'text': curRec['text'],
                            'price': curRec['price']
                        };

                        $('#w2ui-popup #order_edit').w2render('orders_form_edit');
                    };
                },

            });
        }

    };

var order_add_form = {
        method:'POST',
        name: 'orders_form',
        url:{
             get:API_ORDER_POST_URL,
             save:API_ORDER_POST_URL,
        },

        fields: [
            { name: 'number', type: 'numeric', required: true, html: { caption: 'Номер заказа'} },
            { name: 'order_date', type: 'date', required: true, html: { caption: 'Дата заказа'},
            options: { format: 'yyyy-mm-dd' },},
            { name: 'price', type: 'numeric', html: { caption: 'Стоимость' } },
            { field: 'account',   type: 'list', required: true,
                html: { caption: 'Контрагент'},
                options: {
                    url: API_ACCOUNT_GET_URL,

                }

            },
            { name: 'text', type: 'textarea', required: true, html: { caption: 'Текст'} },

        ],

        actions: {
            Reset: function () {
                this.clear();
            },
            Save: function () {
                var errors = this.validate();
                if (errors.length > 0) return;

                $.ajax({
                      method: "POST",
                      url: API_ORDER_POST_URL,

                      data: {
                          number : this.record.number,
                          order_date : this.record.order_date,
                          price : this.record.price,
                          account: this.record.account.id,
                          text: this.record.text
                      }

                    }).done(function( msg ) {
                        w2ui.orders_form.clear();
                        w2popup.close();
                        w2ui.orders_grid.reload();
                    });

            }
        }
};

var order_edit_form = {
        method:'POST',
        name: 'orders_form_edit',
        url:{
             get:API_ORDER_GET_URL,
             save:API_ORDER_POST_URL,
        },

        fields: [
            { name: 'number', type: 'numeric', required: true, html: { caption: 'Номер заказа'} },
            { name: 'order_date', type: 'date', required: true, html: { caption: 'Дата заказа'},
            options: { format: 'yyyy-mm-dd' },},
            { name: 'price', type: 'numeric', html: { caption: 'Стоимость' } },
            { field: 'account',   type: 'list', required: true,
                html: { caption: 'Контрагент'},
                options: {
                    url: '/get/accounts/',

                }

            },
            { name: 'text', type: 'textarea', required: true,
                attr: 'style="height: 90px; width:228px"', html: { caption: 'Текст'} },

        ],

        actions: {
            Reset: function () {
                this.clear();
            },
            Save: function () {
                var errors = this.validate();
                if (errors.length > 0) return;
                let recid = w2ui.orders_grid.getSelection();
                $.ajax({
                      method: "PUT",
                      url: API_ORDER_PUT_URL.replace('(\d+)',recid[0]),

                      data: {
                          number : this.record.number,
                          order_date : this.record.order_date,
                          price : this.record.price,
                          account: this.record.account.id,
                          text: this.record.text
                      }

                    }).done(function( msg ) {

                        w2popup.close();
                        w2ui.orders_grid.reload();
                    });

            }
        }
};
$(function () {
    // initialization
    w2utils.locale(ru);
    $("#grid").w2grid(grid);
    $("").w2form(order_add_form);
    $("").w2form(order_edit_form);
});


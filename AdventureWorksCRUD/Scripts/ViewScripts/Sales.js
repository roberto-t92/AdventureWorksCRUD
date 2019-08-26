//CreditCard Form Model
function CreditCardModel() {
    let CreditCardID = "", CardType = "", CardNumber = "", ExpMonth = "", ExpYear = "", OperationType = "";
}

//CreditCard GET
$(document).ready(function () {
    $("#creditCardTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            creditCardReset();
        },
        "ajax": {
            "url": "/Sales/GetCreditCard",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "CreditCardID" },
            { "data": "CardType" },
            { "data": "CardNumber" },
            { "data": "ExpMonth" },
            { "data": "ExpYear" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "CreditCardID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowCreditCard(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=creditCardConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//CreditCard Edit Button
function editRowCreditCard(data) {
    $('#creditCardSave').text('Update');

    $('#creditCardTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#creditCardCardType').removeClass('border border-danger');
        $('#creditCardCardNumber').removeClass('border border-danger');
        $('#creditCardExpMonth').removeClass('border border-danger');
        $('#creditCardExpYear').removeClass('border border-danger');
    });

    $('#creditCardTable tbody').on('click', 'button', function () {
        let table = $('#creditCardTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#creditCardCardType').val(row.CardType);
        $('#creditCardCardNumber').val(row.CardNumber);
        $('#creditCardExpMonth').val(row.ExpMonth);
        $('#creditCardExpYear').val(row.ExpYear);
        $('#creditCardID').val(data);
    });
}

//CreditCard Validate
function validateCreditCard() {
    let val = true;

    if ($("#creditCardCardType").val() == "") {
        $("#creditCardCardType").addClass('border border-danger');
        val = false;
    }
    if ($("#creditCardCardNumber").val() == "") {
        $("#creditCardCardNumber").addClass('border border-danger');
        val = false;
    }
    if ($("#creditCardExpMonth").val() == "") {
        $("#creditCardExpMonth").addClass('border border-danger');
        val = false;
    }
    if ($("#creditCardExpYear").val() == "") {
        $("#creditCardExpYear").addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#creditCardAlert").show('fade');
        setTimeout(function () { $("#creditCardAlert").hide('fade'); }, 7000);
    }

    return val;
}

//CreditCard Save
$('#creditCardSave').click(function () {
    if (validateCreditCard()) {
        creditCardPOST();
    }
});

//CreditCard POST
function creditCardPOST() {

    let viewModel = new CreditCardModel();
    viewModel.CreditCardID = $('#creditCardID').val();
    viewModel.CardType = $('#creditCardCardType').val();
    viewModel.CardNumber = $('#creditCardCardNumber').val();
    viewModel.ExpMonth = $('#creditCardExpMonth').val();
    viewModel.ExpYear = $('#creditCardExpYear').val();
    viewModel.OperationType = $('#creditCardSave').text();

    let ljson = JSON.stringify({ CC : viewModel });

    $.ajax({
        url: '/Sales/PostCreditCard',
        type: 'POST',
        async: 'true',
        cache: 'false',
        data: ljson,
        contentType: 'application/json',
        beforeSend: function () {
            $(document).ready(function () {
                $.blockUI({
                    message: '<div class="circle"></div><div class="circle1"></div>',
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }
                });
            });
        },
        complete: function () {
            $.unblockUI();
        },
        error: function (xhr, httpStatusMessage, customMessage) {
            if (xhr.status === 500) {
                $.unblockUI();
                $('#errorModalMsg').text(customMessage);
                $('#errorModal').modal('show');
                creditCardReset();
            }
        },
        success: function () {
            $.unblockUI();
            creditCardPostSuccess();
            $('#creditCardTable').DataTable().ajax.reload();
            creditCardReset();
        }
    });
}

//CreditCard POST - Success
function creditCardPostSuccess() {
    $('#creditCardPostSuccess').show('fade');
    setTimeout(function () { $('#creditCardPostSuccess').hide('fade'); }, 6000);
}

//CreditCard DELETE
function creditCardConfirm(data) {
    $('#creditCardModal').modal('show');
    $('#creditCardDeleteID').val(data);
}
function creditCardDelete() {
    let id = $('#creditCardDeleteID').val();
    $('#creditCardID').val(id)
    $('#creditCardSave').text('Delete');
    creditCardPOST();
}

//CreditCard Form - Remove red border as user type
$("#creditCardCardType").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#creditCardCardNumber").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#creditCardExpMonth").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#creditCardExpYear").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//CreditCard Reset
$("#creditCardReset").click(function () {
    creditCardReset();
});
function creditCardReset() {
    $('#creditCardCardType').val('');
    $('#creditCardCardType').removeClass('border border-danger');
    $('#creditCardCardNumber').val('');
    $('#creditCardCardNumber').removeClass('border border-danger');
    $('#creditCardExpMonth').val('');
    $('#creditCardExpMonth').removeClass('border border-danger');
    $('#creditCardExpYear').val('');
    $('#creditCardExpYear').removeClass('border border-danger');

    $('#creditCardTable tr').removeClass('text-primary');

    $('#creditCardID').val('');
    $('#creditCardDeleteID').val('');
    $('#creditCardSave').text('Save');
};

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------

//SalesPerson Form Model
function SalesPersonModel() {
    let BusinessEntityID = "", TerritoryID = "", SalesQuota = "", Bonus = "", CommissionPct = "", SalesYTD = "",
        SalesLastYear = "", rowguid = "", OperationType = "";
}

//SalesPerson GET
$(document).ready(function () {
    $("#salesPersonTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            salesPersonReset();
        },
        "ajax": {
            "url": "/Sales/GetSalesPerson",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "BusinessEntityID" },
            { "data": "TerritoryID" },
            { "data": "SalesQuota" },
            { "data": "Bonus" },
            { "data": "CommissionPct" },
            { "data": "SalesYTD" },
            { "data": "SalesLastYear" },
            { "data": "rowguid" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "BusinessEntityID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowSalesPerson(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=salesPersonConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//SalesPerson Edit Button
function editRowSalesPerson(data) {
    $('#salesPersonSave').text('Update');

    $('#salesPersonTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#salesPersonBonus').removeClass('border border-danger');
        $('#salesPersonCommissionPct').removeClass('border border-danger');
        $('#salesPersonSalesYTD').removeClass('border border-danger');
        $('#salesPersonSalesLastYear').removeClass('border border-danger');
        $('#salesPersonRowguid').removeClass('border border-danger');
    });

    $('#salesPersonTable tbody').on('click', 'button', function () {
        let table = $('#salesPersonTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#salesPersonTerritoryID').val(row.TerritoryID);
        $('#salesPersonSalesQuota').val(row.SalesQuota);
        $('#salesPersonBonus').val(row.Bonus);
        $('#salesPersonCommissionPct').val(row.CommissionPct);
        $('#salesPersonSalesYTD').val(row.SalesYTD);
        $('#salesPersonSalesLastYear').val(row.SalesLastYear);
        $('#salesPersonRowguid').val(row.rowguid);
        $('#salesPersonID').val(data);
    });
}

//SalesPerson Validate
function validateSalesPerson() {
    let val = true;

    if ($("#salesPersonBonus").val() == "") {
        $("#salesPersonBonus").addClass('border border-danger');
        val = false;
    }
    if ($("#salesPersonCommissionPct").val() == "") {
        $("#salesPersonCommissionPct").addClass('border border-danger');
        val = false;
    }
    if ($("#salesPersonSalesYTD").val() == "") {
        $("#salesPersonSalesYTD").addClass('border border-danger');
        val = false;
    }
    if ($("#salesPersonSalesLastYear").val() == "") {
        $("#salesPersonSalesLastYear").addClass('border border-danger');
        val = false;
    }
    if ($("#salesPersonRowguid").val() == "") {
        $("#salesPersonRowguid").addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#salesPersonAlert").show('fade');
        setTimeout(function () { $("#salesPersonAlert").hide('fade'); }, 7000);
    }

    return val;
}

//SalesPerson Save
$('#salesPersonSave').click(function () {
    if (validateSalesPerson()) {
        salesPersonPOST();
    }
});

//salesPerson POST
function salesPersonPOST() {

    let viewModel = new SalesPersonModel();
    viewModel.BusinessEntityID = $('#salesPersonID').val();
    viewModel.TerritoryID = $('#salesPersonTerritoryID').val();
    viewModel.SalesQuota = $('#salesPersonSalesQuota').val();
    viewModel.Bonus = $('#salesPersonBonus').val();
    viewModel.CommissionPct = $('#salesPersonCommissionPct').val();
    viewModel.SalesYTD = $('#salesPersonSalesYTD').val();
    viewModel.SalesLastYear = $('#salesPersonSalesLastYear').val();
    viewModel.rowguid = $('#salesPersonRowguid').val();
    viewModel.OperationType = $('#salesPersonSave').text();

    let ljson = JSON.stringify({ SP : viewModel });

    $.ajax({
        url: '/Sales/PostSalesPerson',
        type: 'POST',
        async: 'true',
        cache: 'false',
        data: ljson,
        contentType: 'application/json',
        beforeSend: function () {
            $(document).ready(function () {
                $.blockUI({
                    message: '<div class="circle"></div><div class="circle1"></div>',
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }
                });
            });
        },
        complete: function () {
            $.unblockUI();
        },
        error: function (xhr, httpStatusMessage, customMessage) {
            if (xhr.status === 500) {
                $.unblockUI();
                $('#errorModalMsg').text(customMessage);
                $('#errorModal').modal('show');
                salesPersonReset();
            }
        },
        success: function () {
            $.unblockUI();
            salesPersonPostSuccess();
            $('#salesPersonTable').DataTable().ajax.reload();
            salesPersonReset();
        }
    });
}

//SalesPerson POST - Success
function salesPersonPostSuccess() {
    $('#salesPersonPostSuccess').show('fade');
    setTimeout(function () { $('#salesPersonPostSuccess').hide('fade'); }, 6000);
}

//SalesPerson DELETE
function salesPersonConfirm(data) {
    $('#salesPersonModal').modal('show');
    $('#salesPersonDeleteID').val(data);
}
function salesPersonDelete() {
    let id = $('#salesPersonDeleteID').val();
    $('#salesPersonID').val(id)
    $('#salesPersonSave').text('Delete');
    salesPersonPOST();
}

//SalesPerson Form - Remove red border as user type
$("#salesPersonBonus").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#salesPersonCommissionPct").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#salesPersonSalesYTD").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#salesPersonSalesLastYear").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#salesPersonRowguid").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//SalesPerson Reset
$("#salesPersonReset").click(function () {
    salesPersonReset();
});
function salesPersonReset() {
    $('#salesPersonTerritoryID').val('');
    $('#salesPersonSalesQuota').val('');
    $('#salesPersonBonus').val('');
    $('#salesPersonBonus').removeClass('border border-danger');
    $('#salesPersonCommissionPct').val('');
    $('#salesPersonCommissionPct').removeClass('border border-danger');
    $('#salesPersonSalesYTD').val('');
    $('#salesPersonSalesYTD').removeClass('border border-danger');
    $('#salesPersonSalesLastYear').val('');
    $('#salesPersonSalesLastYear').removeClass('border border-danger');
    $('#salesPersonRowguid').val('');
    $('#salesPersonRowguid').removeClass('border border-danger');

    $('#salesPersonTable tr').removeClass('text-primary');

    $('#salesPersonID').val('');
    $('#salesPersonDeleteID').val('');
    $('#salesPersonSave').text('Save');
};
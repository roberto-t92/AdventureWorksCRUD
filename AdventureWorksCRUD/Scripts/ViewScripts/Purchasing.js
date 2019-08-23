//ProductVendor Form Model
function ProductVendorModel() {
    let ProductID = "", BusinessEntityID = "", AverageLeadTime = "", StandardPrice = "", LastReceiptCost = "", LastReceiptDate = "",
        MinOrderQty = "", MaxOrderQty = "", OnOrderQty = "", UnitMeasureCode = "", OperationType = "";
}

//ProductVendor GET
$(document).ready(function () {
    $("#productVendorTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            productVendorReset();
        },
        "ajax": {
            "url": "/Purchasing/GetProductVendor",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "ProductID" },
            { "data": "BusinessEntityID" },
            { "data": "AverageLeadTime" },
            { "data": "StandardPrice" },
            { "data": "LastReceiptCost" },
            {
                "data": "LastReceiptDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            { "data": "MinOrderQty" },
            { "data": "MaxOrderQty" },
            { "data": "OnOrderQty" },
            { "data": "UnitMeasureCode" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "ProductID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowProductVendor(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=productVendorConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//ProductVendor Edit Button
function editRowProductVendor(data) {
    $('#productVendorSave').text('Update');

    $('#productVendorTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#productVendorBusinessEntityID').removeClass('border border-danger');
        $('#productVendorAverageLeadTime').removeClass('border border-danger');
        $('#productVendorStandardPrice').removeClass('border border-danger');
        $('#productVendorMinOrderQty').removeClass('border border-danger');
        $('#productVendorMaxOrderQty').removeClass('border border-danger');
        $('#productVendorUnitMeasureCode').removeClass('border border-danger');
    });

    $('#productVendorTable tbody').on('click', 'button', function () {
        let table = $('#productVendorTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#productVendorBusinessEntityID').val(row.BusinessEntityID);
        $('#productVendorAverageLeadTime').val(row.AverageLeadTime);
        $('#productVendorStandardPrice').val(row.StandardPrice);
        $('#productVendorLastReceiptCost').val(row.LastReceiptCost);
        $('#productVendorLastReceiptDate').val(moment(row.LastReceiptDate).format("DD-MM-YYYY"));
        $('#productVendorMinOrderQty').val(row.MinOrderQty);
        $('#productVendorMaxOrderQty').val(row.MaxOrderQty);
        $('#productVendorOnOrderQty').val(row.OnOrderQty);
        $('#productVendorUnitMeasureCode').val(row.UnitMeasureCode);
        $('#productVendorID').val(data);
    });
}

//ProductVendor Validate
function validateProductVendor() {
    let val = true;

    if ($("#productVendorBusinessEntityID").val() == "") {
        $("#productVendorBusinessEntityID").addClass('border border-danger');
        val = false;
    }
    if ($("#productVendorAverageLeadTime").val() == "") {
        $("#productVendorAverageLeadTime").addClass('border border-danger');
        val = false;
    }
    if ($("#productVendorStandardPrice").val() == "") {
        $("#productVendorStandardPrice").addClass('border border-danger');
        val = false;
    }
    if ($("#productVendorMinOrderQty").val() == "") {
        $("#productVendorMinOrderQty").addClass('border border-danger');
        val = false;
    }
    if ($("#productVendorMaxOrderQty").val() == "") {
        $("#productVendorMaxOrderQty").addClass('border border-danger');
        val = false;
    }
    if ($("#productVendorUnitMeasureCode").val() == "") {
        $("#productVendorUnitMeasureCode").addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#productVendorAlert").show('fade');
        setTimeout(function () { $("#productVendorAlert").hide('fade'); }, 7000);
    }

    return val;
}

//ProductVendor Save
$('#productVendorSave').click(function () {
    if (validateProductVendor()) {
        productVendorPOST();
    }
});

//ProductVendor POST
function productVendorPOST() {

    let viewModel = new ProductVendorModel();
    viewModel.ProductID = $('#productVendorID').val();
    viewModel.BusinessEntityID = $('#productVendorBusinessEntityID').val();
    viewModel.AverageLeadTime = $('#productVendorAverageLeadTime').val();
    viewModel.StandardPrice = $('#productVendorStandardPrice').val();
    viewModel.LastReceiptCost = $('#productVendorLastReceiptCost').val();
    viewModel.LastReceiptDate = $('#productVendorLastReceiptDate').val();
    viewModel.MinOrderQty = $('#productVendorMinOrderQty').val();
    viewModel.MaxOrderQty = $('#productVendorMaxOrderQty').val();
    viewModel.OnOrderQty = $('#productVendorOnOrderQty').val();
    viewModel.UnitMeasureCode = $('#productVendorUnitMeasureCode').val();
    viewModel.OperationType = $('#productVendorSave').text();

    let ljson = JSON.stringify({ PV: viewModel });

    $.ajax({
        url: '/Purchasing/PostProductVendor',
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
                productVendorReset();
            }
        },
        success: function () {
            $.unblockUI();
            productVendorPostSuccess();
            $('#productVendorTable').DataTable().ajax.reload();
            productVendorReset();
        }
    });
}

//ProductVendor POST - Success
function productVendorPostSuccess() {
    $('#productVendorPostSuccess').show('fade');
    setTimeout(function () { $('#productVendorPostSuccess').hide('fade'); }, 6000);
}

//ProductVendor DELETE
function productVendorConfirm(data) {
    $('#productVendorModal').modal('show');
    $('#productVendorDeleteID').val(data);
}
function productVendorDelete() {
    let id = $('#productVendorDeleteID').val();
    $('#productVendorID').val(id)
    $('#productVendorSave').text('Delete');
    productVendorPOST();
}

//ProductVendor Form - Remove red border as user type
$("#productVendorBusinessEntityID").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#productVendorAverageLeadTime").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#productVendorStandardPrice").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#productVendorMinOrderQty").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#productVendorMaxOrderQty").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#productVendorUnitMeasureCode").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//ProductVendor Reset
$("#productVendorReset").click(function () {
    productVendorReset();
});
function productVendorReset() {
    $('#productVendorBusinessEntityID').val('');
    $('#productVendorBusinessEntityID').removeClass('border border-danger');
    $('#productVendorAverageLeadTime').val('');
    $('#productVendorAverageLeadTime').removeClass('border border-danger');
    $('#productVendorStandardPrice').val('');
    $('#productVendorStandardPrice').removeClass('border border-danger');
    $('#productVendorLastReceiptCost').val('');
    $('#productVendorLastReceiptDate').val('');
    $('#productVendorMinOrderQty').val('');
    $('#productVendorMinOrderQty').removeClass('border border-danger');
    $('#productVendorMaxOrderQty').val('');
    $('#productVendorMaxOrderQty').removeClass('border border-danger');
    $('#productVendorOnOrderQty').val('');
    $('#productVendorUnitMeasureCode').val('');
    $('#productVendorUnitMeasureCode').removeClass('border border-danger');

    $('#productVendorTable tr').removeClass('text-primary');

    $('#productVendorID').val('');
    $('#productVendorDeleteID').val('');
    $('#productVendorSave').text('Save');
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------
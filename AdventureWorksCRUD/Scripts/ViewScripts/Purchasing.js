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

//ShipMethod Form Model
function ShipMethodModel() {
    let ShipMethodID = "", Name = "", ShipBase = "", ShipRate = "", rowguid = "", OperationType = "";
}

//ShipMethod GET
$(document).ready(function () {
    $("#shipMethodTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            shipMethodReset();
        },
        "ajax": {
            "url": "/Purchasing/GetShipMethod",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "ShipMethodID" },
            { "data": "Name" },
            { "data": "ShipBase" },
            { "data": "ShipRate" },
            { "data": "rowguid" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "ShipMethodID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowShipMethod(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=shipMethodConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//ShipMethod Edit Button
function editRowShipMethod(data) {
    $('#shipMethodSave').text('Update');

    $('#shipMethodTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#shipMethodName').removeClass('border border-danger');
        $('#shipMethodShipBase').removeClass('border border-danger');
        $('#shipMethodShipRate').removeClass('border border-danger');
        $('#shipMethodRowguid').removeClass('border border-danger');
    });

    $('#shipMethodTable tbody').on('click', 'button', function () {
        let table = $('#shipMethodTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#shipMethodName').val(row.Name);
        $('#shipMethodShipBase').val(row.ShipBase);
        $('#shipMethodShipRate').val(row.ShipRate);
        $('#shipMethodRowguid').val(row.rowguid);
        $('#shipMethodID').val(data);
    });
}

//ShipMethod Validate
function validateShipMethod() {
    let val = true;

    if ($("#shipMethodName").val() == "") {
        $("#shipMethodName").addClass('border border-danger');
        val = false;
    }
    if ($("#shipMethodShipBase").val() == "") {
        $("#shipMethodShipBase").addClass('border border-danger');
        val = false;
    }
    if ($("#shipMethodShipRate").val() == "") {
        $("#shipMethodShipRate").addClass('border border-danger');
        val = false;
    }
    if ($("#shipMethodRowguid").val() == "") {
        $("#shipMethodRowguid").addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#shipMethodAlert").show('fade');
        setTimeout(function () { $("#shipMethodAlert").hide('fade'); }, 7000);
    }

    return val;
}

//ShipMehod Save
$('#shipMethodSave').click(function () {
    if (validateShipMethod()) {
        shipMethodPOST();
    }
});

//ShipMethod POST
function shipMethodPOST() {

    let viewModel = new ShipMethodModel();
    viewModel.ShipMethodID = $('#shipMethodID').val();
    viewModel.Name = $('#shipMethodName').val();
    viewModel.ShipBase = $('#shipMethodShipBase').val();
    viewModel.ShipRate = $('#shipMethodShipRate').val();
    viewModel.rowguid = $('#shipMethodRowguid').val();
    viewModel.OperationType = $('#shipMethodSave').text();

    let ljson = JSON.stringify({ SM : viewModel });

    $.ajax({
        url: '/Purchasing/PostShipMethod',
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
                shipMethodReset();
            }
        },
        success: function () {
            $.unblockUI();
            shipMethodPostSuccess();
            $('#shipMethodTable').DataTable().ajax.reload();
            shipMethodReset();
        }
    });
}

//ShipMethod POST - Success
function shipMethodPostSuccess() {
    $('#shipMethodPostSuccess').show('fade');
    setTimeout(function () { $('#shipMethodPostSuccess').hide('fade'); }, 6000);
}

//ShipMethod DELETE
function shipMethodConfirm(data) {
    $('#shipMethodModal').modal('show');
    $('#shipMethodDeleteID').val(data);
}
function shipMethodDelete() {
    let id = $('#shipMethodDeleteID').val();
    $('#shipMethodID').val(id)
    $('#shipMethodSave').text('Delete');
    shipMethodPOST();
}

//ShipMethod Form - Remove red border as user type
$("#shipMethodName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#shipMethodShipBase").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#shipMethodShipRate").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#shipMethodRowguid").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//ShipMethod Reset
$("#shipMethodReset").click(function () {
    shipMethodReset();
});
function shipMethodReset() {
    $('#shipMethodName').val('');
    $('#shipMethodName').removeClass('border border-danger');
    $('#shipMethodShipRate').val('');
    $('#shipMethodShipRate').removeClass('border border-danger');
    $('#shipMethodShipBase').val('');
    $('#shipMethodShipBase').removeClass('border border-danger');
    $('#shipMethodRowguid').val('');
    $('#shipMethodRowguid').removeClass('border border-danger');

    $('#shipMethodTable tr').removeClass('text-primary');

    $('#shipMethodID').val('');
    $('#shipMethodDeleteID').val('');
    $('#shipMethodSave').text('Save');
};
//Location Form Model
function LocationModel() {
    let LocationID = "", Name = "", CostRate = "", Availability = "", OperationType = "";
}

//Location GET
$(document).ready(function () {
    $("#locationTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            locationReset();
        },
        "ajax": {
            "url": "/Production/GetLocation",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "LocationID" },
            { "data": "Name" },
            { "data": "CostRate" },
            { "data": "Availability" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "LocationID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowLocation("+data+")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=locationConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                 },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//Location Edit Button
function editRowLocation(data) {
    $('#locationSave').text('Update');

    $('#locationTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#locationName').removeClass('border border-danger');
    });

    $('#locationTable tbody').on('click', 'button', function () {
        let table = $('#locationTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#locationName').val(row.Name);
        $('#locationCostRate').val(row.CostRate);
        $('#locationAvailability').val(row.Availability);
        $('#locationID').val(data);
    });
}

//Location Validate
function validateLocation() {
    let val = true;

    if ($("#locationName").val() == "") {
        $("#locationName").addClass('border border-danger');
        val = false;
    }
    if ($("#locationCostRate").val() == "") {
        $("#locationCostRate").addClass('border border-danger');
        val = false;
    }
    if ($("#locationAvailability").val() == "") {
        $("#locationAvailability").addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#locationAlert").show('fade');
        setTimeout(function () { $("#locationAlert").hide('fade'); }, 7000);
    }

    return val;
}

//Location Save
$('#locationSave').click(function () {
    if (validateLocation()) {
        locationPOST();
    }
});

//Location POST
function locationPOST() {

    let viewModel = new LocationModel();
    viewModel.LocationID = $('#locationID').val();
    viewModel.Name = $('#locationName').val();
    viewModel.CostRate = $('#locationCostRate').val();
    viewModel.Availability = $('#locationAvailability').val();
    viewModel.OperationType = $('#locationSave').text();

    let ljson = JSON.stringify({ LC: viewModel });

    $.ajax({
        url: '/Production/PostLocation',
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
                locationReset();
            }
        },
        success: function () {
            $.unblockUI();
            locationPostSuccess();
            $('#locationTable').DataTable().ajax.reload();
            locationReset();
        }
    });
}

//Location POST - Success
function locationPostSuccess() {
    $('#locationPostSuccess').show('fade');
    setTimeout(function () { $('#locationPostSuccess').hide('fade'); }, 6000);
}

//Location DELETE
function locationConfirm(data) {
    $('#locationModal').modal('show');
    $('#locationDeleteID').val(data);
}
function locationDelete() {
    let id = $('#locationDeleteID').val();
    $('#locationID').val(id)
    $('#locationSave').text('Delete');
    locationPOST();
}

//Location Form - Remove red border as user type
$("#locationName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#locationCostRate").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#locationAvailability").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//Location Reset
$("#locationReset").click(function () {
    locationReset();
});
function locationReset() {
    $('#locationName').val('');
    $('#locationName').removeClass('border border-danger');
    $('#locationCostRate').val('');
    $('#locationCostRate').removeClass('border border-danger');
    $('#locationAvailability').val('');
    $('#locationAvailability').removeClass('border border-danger');

    $('#locationTable tr').removeClass('text-primary');

    $('#locationID').val('');
    $('#locationDeleteID').val('');
    $('#locationSave').text('Save');
};

//--------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------


//ProductCategory Form Model
function ProductCategoryModel() {
    let ProductCategoryID = "", Name = "", rowguid = "",  OperationType = "";
}

//ProductCategory GET
$(document).ready(function () {
    $("#productCategoryTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            productCategoryReset();
        },
        "ajax": {
            "url": "/Production/GetProductCategory",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "ProductCategoryID" },
            { "data": "rowguid" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "ProductCategoryID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowProductCategory(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=productCategoryConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//ProductCategory Edit Button
function editRowProductCategory(data) {
    $('#productCategorySave').text('Update');

    $('#productCategoryTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#productCategoryName').removeClass('border border-danger');
        $('#productRowguid').removeClass('border border-danger');
    });

    $('#productCategoryTable tbody').on('click', 'button', function () {
        let table = $('#productCategoryTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#productCategoryName').val(row.Name);
        $('#productCategoryRowguid').val(row.CostRate);
        $('#productCategoryID').val(data);
    });
}

//ProductCategory Validate
function validateProductCategory() {
    let val = true;

    if ($("#productCategoryName").val() == "") {
        $("#productCategoryName").addClass('border border-danger');
        val = false;
    }
    if ($("#productCategoryRowguid").val() == "") {
        $("#productCategoryRowguid").addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#productCategoryAlert").show('fade');
        setTimeout(function () { $("#productCategoryAlert").hide('fade'); }, 7000);
    }

    return val;
}

//ProductCategory Save
$('#productCategorySave').click(function () {
    if (validateProductCategory()) {
        productCategoryPOST();
    }
});

//ProductCategory POST
function productCategoryPOST() {

    let viewModel = new ProductCategoryModel();
    viewModel.ProductCategoryID = $('#productCategoryID').val();
    viewModel.Name = $('#productCategoryName').val();
    viewModel.rowguid = $('#productCategoryRowguid').val();
    viewModel.OperationType = $('#productCategorySave').text();

    let ljson = JSON.stringify({ PC: viewModel });

    $.ajax({
        url: '/Production/PostProductCategory',
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
                productCategoryReset();
            }
        },
        success: function () {
            $.unblockUI();
            productCategoryPostSuccess();
            $('#productCategoryTable').DataTable().ajax.reload();
            productCategoryReset();
        }
    });
}

//ProductCategory POST - Success
function productCategoryPostSuccess() {
    $('#productCategoryPostSuccess').show('fade');
    setTimeout(function () { $('#productCategoryPostSuccess').hide('fade'); }, 6000);
}

//Location DELETE
function productCategoryConfirm(data) {
    $('#productCategoryModal').modal('show');
    $('#productCategoryDeleteID').val(data);
}
function productCategoryDelete() {
    let id = $('#productCategoryDeleteID').val();
    $('#productCategoryID').val(id)
    $('#productCategorySave').text('Delete');
    productCategoryPOST();
}

//ProductCategory Form - Remove red border as user type
$("#productCategoryName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#productCategoryRowguid").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//ProductCategory Reset
$("#productCategoryReset").click(function () {
    productCategoryReset();
});
function productCategoryReset() {
    $('#productCategoryName').val('');
    $('#productCategoryName').removeClass('border border-danger');
    $('#productCategoryRowguid').val('');
    $('#productCategoryRowguid').removeClass('border border-danger');

    $('#productCategoryTable tr').removeClass('text-primary');

    $('#productCategoryID').val('');
    $('#productCategoryDeleteID').val('');
    $('#productCategorySave').text('Save');
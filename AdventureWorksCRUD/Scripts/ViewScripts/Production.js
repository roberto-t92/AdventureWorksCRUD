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
            { "data": "Name" },
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
        $('#productCategoryRowguid').removeClass('border border-danger');
    });

    $('#productCategoryTable tbody').on('click', 'button', function () {
        let table = $('#productCategoryTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#productCategoryName').val(row.Name);
        $('#productCategoryRowguid').val(row.rowguid);
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

//ProductCategory DELETE
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
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------

//ProductReview Form Model
function ProductReviewModel() {
    let ProductReviewID = "", ProductID = "", ReviewerName = "", ReviewDate = "", EmailAddress = "", Rating = "",
        Comments = "", OperationType = "";
}

//ProductReview GET
$(document).ready(function () {
    $("#productReviewTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            productReviewReset();
        },
        "ajax": {
            "url": "/Production/GetProductReview",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "ProductReviewID" },
            { "data": "ProductID" },
            { "data": "ReviewerName" },
            {
                "data": "ReviewDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            { "data": "EmailAddress" },
            { "data": "Rating" },
            { "data": "Comments" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "ProductReviewID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowProductReview(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=productReviewConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//ProductReview Edit Button
function editRowProductReview(data) {
    $('#productReviewSave').text('Update');

    $('#productReviewTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#productReviewProductID').removeClass('border border-danger');
        $('#productReviewReviewerName').removeClass('border border-danger');
        $('#productReviewReviewDate').removeClass('border border-danger');
        $('#productReviewEmailAddress').removeClass('border border-danger');
        $('#productReviewRating').removeClass('border border-danger');
    });

    $('#productReviewTable tbody').on('click', 'button', function () {
        let table = $('#productReviewTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#productReviewProductID').val(row.ProductID);
        $('#productReviewReviewerName').val(row.ReviewerName);
        $('#productReviewReviewDate').val(moment(row.ReviewDate).format("DD-MM-YYYY"));
        $('#productReviewEmailAddress').val(row.EmailAddress);
        $('#productReviewRating').val(row.Rating);
        $('#productReviewComments').val(row.Comments);
        $('#productReviewID').val(data);
    });
}

//ProductReview Validate
function validateProductReview() {
    let val = true;

    if ($("#productReviewProductID").val() == "") {
        $("#productReviewProductID").addClass('border border-danger');
        val = false;
    }
    if ($("#productReviewReviewerName").val() == "") {
        $("#productReviewReviewerName").addClass('border border-danger');
        val = false;
    }
    if ($("#productReviewReviewDate").val() == "") {
        $("#productReviewReviewDate").addClass('border border-danger');
        val = false;
    }
    if ($("#productReviewEmailAddress").val() == "") {
        $("#productReviewEmailAddress").addClass('border border-danger');
        val = false;
    }
    if ($("#productReviewRating").val() == "") {
        $("#productReviewRating").addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#productReviewAlert").show('fade');
        setTimeout(function () { $("#productReviewAlert").hide('fade'); }, 7000);
    }

    return val;
}

//ProductReview Save
$('#productReviewSave').click(function () {
    if (validateProductReview()) {
        productReviewPOST();
    }
});

//ProductReview POST
function productReviewPOST() {

    let viewModel = new ProductReviewModel();
    viewModel.ProductReviewID = $('#productReviewID').val();
    viewModel.ProductID = $('#productReviewProductID').val();
    viewModel.ReviewerName = $('#productReviewReviewerName').val();
    viewModel.ReviewDate = $('#productReviewReviewDate').val();
    viewModel.EmailAddress = $('#productReviewEmailAddress').val();
    viewModel.Rating = $('#productReviewRating').val();
    viewModel.Comments = $('#productReviewComments').val();
    viewModel.OperationType = $('#productReviewSave').text();

    let ljson = JSON.stringify({ PR : viewModel });

    $.ajax({
        url: '/Production/PostProductReview',
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
                productReviewReset();
            }
        },
        success: function () {
            $.unblockUI();
            productReviewPostSuccess();
            $('#productReviewTable').DataTable().ajax.reload();
            productReviewReset();
        }
    });
}

//ProductReview POST - Success
function productReviewPostSuccess() {
    $('#productReviewPostSuccess').show('fade');
    setTimeout(function () { $('#productReviewPostSuccess').hide('fade'); }, 6000);
}

//ProductReview DELETE
function productReviewConfirm(data) {
    $('#productReviewModal').modal('show');
    $('#productReviewDeleteID').val(data);
}
function productReviewDelete() {
    let id = $('#productReviewDeleteID').val();
    $('#productReviewID').val(id)
    $('#productReviewSave').text('Delete');
    productReviewPOST();
}

//ProductReview Form - Remove red border as user type
$("#productReviewProductID").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#productReviewReviewerName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#productReviewReviewDate").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#productReviewEmailAddress").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#productReviewRating").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//ProductReview Reset
$("#productReviewReset").click(function () {
    productReviewReset();
});
function productReviewReset() {
    $('#productReviewProductID').val('');
    $('#productReviewProductID').removeClass('border border-danger');
    $('#productReviewReviewerName').val('');
    $('#productReviewReviewerName').removeClass('border border-danger');
    $('#productReviewReviewDate').val('');
    $('#productReviewReviewDate').removeClass('border border-danger');
    $('#productReviewEmailAddress').val('');
    $('#productReviewEmailAddress').removeClass('border border-danger');
    $('#productReviewRating').val('');
    $('#productReviewRating').removeClass('border border-danger');
    $('#productReviewComments').val('');

    $('#productReviewTable tr').removeClass('text-primary');

    $('#productReviewID').val('');
    $('#productReviewDeleteID').val('');
    $('#productReviewSave').text('Save');
}
//Address Form Model
function AddressModel() {
    let AddressID = "", AddressLine1 = "", AddressLine2 = "", City = "", StateProvinceID="", PostalCode = "", rowguid = "", OperationType = "";
}

// Address GET
$(document).ready(function () {
    $("#addressTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            addressReset();
        },
        "ajax": {
            "url": "/Person/GetAddress",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "AddressID" },
            { "data": "AddressLine1" },
            { "data": "AddressLine2" },
            { "data": "City" },
            { "data": "StateProvinceID" },
            { "data": "PostalCode" },
            { "data": "rowguid" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "AddressID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowAddress(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=addressConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//Address Edit Button
function editRowAddress(data) {
    $('#addressSave').text('Update');
    
    $('#addressTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#addressLine1').removeClass('border border-danger');
        $('#addressCity').removeClass('border border-danger');
        $('#addressStateProvinceID').removeClass('border border-danger');
        $('#addressPostalCode').removeClass('border border-danger');
        $('#addressRowguid').removeClass('border border-danger');
    });

    $('#addressTable tbody').on('click', 'button', function () {
        let table = $('#addressTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#addressLine1').val(row.AddressLine1);
        $('#addressLine2').val(row.AddressLine2);

        if ($('#addressLine2').val() == "") {
            $('#addressLine2').attr("placeholder", '');
        }

        $('#addressCity').val(row.City);
        $('#addressStateProvinceID').attr('placeholder', 'Cannot be updated.');
        $('#addressStateProvinceID').prop('disabled', true);
        $('#addressPostalCode').val(row.PostalCode);
        $('#addressRowguid').val(row.rowguid);

        $('#addressID').val(data);
    });
}

//Address Validate
function validateAddress() {
    let val = true;

    if ($("#addressLine1").val() == "") {
        $("#addressLine1").addClass('border border-danger');
        val = false;
    }
    if ($('#addressCity').val() == "") {
        $("#addressCity").addClass('border border-danger');
        val = false;
    }
    if ($('#addressStateProvinceID').val() == "") {
        $("#addressStateProvinceID").addClass('border border-danger');
        val = false;
    }
    if ($('#addressPostalCode').val() == "") {
        $("#addressPostalCode").addClass('border border-danger');
        val = false;
    }
    if ($('#addressRowguid').val() == "") {
        $('#addressRowguid').addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#addressAlert").show('fade');
        setTimeout(function () { $("#addressAlert").hide('fade'); }, 7000);
    }

    return val;
}

//Address Save
$('#addressSave').click(function () {
    if (validateAddress()) {
        addressPOST();
    }
});

//Address POST
function addressPOST() {

    let viewModel = new AddressModel();
    viewModel.AddressID = $('#addressID').val();
    viewModel.AddressLine1 = $('#addressLine1').val();
    viewModel.AddressLine2 = $('#addressLine2').val();
    viewModel.City = $('#addressCity').val();
    viewModel.StateProvinceID = $('#addressStateProvinceID').val();
    viewModel.PostalCode = $('#addressPostalCode').val();
    viewModel.rowguid = $('#addressRowguid').val();
    viewModel.OperationType = $('#addressSave').text();

    let ljson = JSON.stringify({ AD: viewModel });

    $.ajax({
        url: '/Person/PostAddress',
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
                addressReset();
            }
        },
        success: function () {
            $.unblockUI();
            addressPostSuccess();
            $('#addressTable').DataTable().ajax.reload();
            addressReset();
        }
    });
}

//Address POST - Success
function addressPostSuccess() {
    $('#addressPostSuccess').show('fade');
    setTimeout(function () { $('#addressPostSuccess').hide('fade'); }, 6000);
}

//Address DELETE
function addressConfirm(data) {
    $('#addressModal').modal('show');
    $('#addressDeleteID').val(data);
}
function addressDelete() {
    let id = $('#addressDeleteID').val();
    $('#addressID').val(id)
    $('#addressSave').text('Delete');
    addressPOST();
}

//Address Form - Remove red border as user type
$("#addressLine1").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#addressCity").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#addressStateProvinceID").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#addressPostalCode").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#addressRowguid").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//Address Reset
$("#addressReset").click(function () {
    addressReset();
});
function addressReset() {
    $('#addressLine1').val('');
    $('#addressLine2').val('');
    $('#addressCity').val('');
    $('#addressStateProvinceID').attr('placeholder', 'State Province ID *');
    $('#addressPostalCode').val('');
    $('#addressRowguid').val('');
    $('#addressLine1').removeClass('border border-danger');
    $('#addressCity').removeClass('border border-danger');
    $('#addressStateProvinceID').removeClass('border border-danger');
    $('#addressStateProvinceID').prop('disabled', false);
    $('#addressPostalCode').removeClass('border border-danger');
    $('#addressRowguid').removeClass('border border-danger');
    if ($('#addressLine2').val() == "") {
        $('#addressLine2').attr("placeholder", 'Address 2');
    }

    $('#addressTable tr').removeClass('text-primary');

    $('#addressID').val('');
    $('#addressDeleteID').val('');
    $('#addressSave').text('Save');
};

//--------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------

//Person Form Model
function PersonModel() {
    let BusinessEntityID = "", PersonType = "", NameStyle = "", Title = "", FirstName = "", MiddleName = "", LastName = "",
        Suffix = "", EmailPromotion = "", rowguid = "", OperationType = "";
}

//Person GET
$(document).ready(function () {
    $("#personTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            //personReset();
        },
        "ajax": {
            "url": "/Person/GetPerson",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "BusinessEntityID" },
            { "data": "PersonType" },
            { "data": "NameStyle" },
            { "data": "Title" },
            { "data": "FirstName" },
            { "data": "MiddleName" },
            { "data": "LastName" },
            { "data": "Suffix" },
            { "data": "EmailPromotion" },
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
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowPerson(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=personConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

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
            personReset();
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

//Person Edit Button
function editRowPerson(data) {
    $('#personSave').text('Update');

    $('#personTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#personPersonType').removeClass('border border-danger');
        $('#personNameStyle').removeClass('border border-danger');
        $('#personFirstName').removeClass('border border-danger');
        $('#personLastName').removeClass('border border-danger');
        $('#personEmailPromotion').removeClass('border border-danger');
        $('#personRowguid').removeClass('border border-danger');
    });

    $('#personTable tbody').on('click', 'button', function () {
        let table = $('#personTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#personPersonType').val(row.PersonType);
        $('#personNameStyle').val(row.NameStyle);

        $('#personTitle').val(row.Title);
        if ($('#personTitle').val() == "") {
            $('#personTitle').attr("placeholder", '');
        }

        $('#personFirstName').val(row.FirstName);

        $('#personMiddleName').val(row.MiddleName);
        if ($('#personMiddleName').val() == "") {
            $('#personMiddleName').attr("placeholder", '');
        }

        $('#personLastName').val(row.LastName);

        $('#personSuffix').val(row.Suffix);
        if ($('#personSuffix').val() == "") {
            $('#personSuffix').attr("placeholder", '');
        }
        $('#personEmailPromotion').val(row.EmailPromotion);
        $('#personRowguid').val(row.rowguid);
        $('#personID').val(data);
    });
}

//Person Validate
function validatePerson() {
    let val = true;

    if ($("#personPersonType").val() == "") {
        $("#personPersonType").addClass('border border-danger');
        val = false;
    }
    if ($('#personNameStyle').val() == "") {
        $("#personNameStyle").addClass('border border-danger');
        val = false;
    }
    if ($('#personFirstName').val() == "") {
        $("#personFirstName").addClass('border border-danger');
        val = false;
    }
    if ($('#personLastName').val() == "") {
        $("#personLastName").addClass('border border-danger');
        val = false;
    }
    if ($('#personEmailPromotion').val() == "") {
        $('#personEmailPromotion').addClass('border border-danger');
        val = false;
    }
    if ($('#personRowguid').val() == "") {
        $('#personRowguid').addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#personAlert").show('fade');
        setTimeout(function () { $("#personAlert").hide('fade'); }, 7000);
    }

    return val;
}

//Person Save
$('#personSave').click(function () {
    if (validatePerson()) {
        personPOST();
    }
});

//Person POST
function personPOST() {

    let viewModel = new PersonModel();
    viewModel.BusinessEntityID = $('#personID').val();
    viewModel.PersonType = $('#personPersonType').val();
    viewModel.NameStyle = $('#personNameStyle').val();
    viewModel.Title = $('#personTitle').val();
    viewModel.FirstName = $('#personFirstName').val();
    viewModel.MiddleName = $('#personMiddleName').val();
    viewModel.LastName = $('#personLastName').val();
    viewModel.Suffix = $('#personSuffix').val();
    viewModel.EmailPromotion = $('#personEmailPromotion').val();
    viewModel.rowguid = $('#personRowguid').val();
    viewModel.OperationType = $('#personSave').text();

    let ljson = JSON.stringify({ PE: viewModel });

    $.ajax({
        url: '/Person/PostPerson',
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
                personReset();
            }
        },
        success: function () {
            $.unblockUI();
            personPostSuccess();
            $('#personTable').DataTable().ajax.reload();
            personReset();
        }
    });
}

//Person POST - Success
function personPostSuccess() {
    $('#personPostSuccess').show('fade');
    setTimeout(function () { $('#personPostSuccess').hide('fade'); }, 6000);
}

//Person DELETE
function personConfirm(data) {
    $('#personModal').modal('show');
    $('#personDeleteID').val(data);
}
function personDelete() {
    let id = $('#personDeleteID').val();
    $('#personID').val(id)
    $('#personSave').text('Delete');
    personPOST();
}

//Person Form - Remove red border as user type
$("#personPersonType").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#personNameStyle").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#personFirstName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#personLastName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#personEmailPromotion").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#personRowguid").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//Person Reset
$("#personReset").click(function () {
    personReset();
});
function personReset() {
    $('#personPersonType').val('');
    $('#personNameStyle').val('');
    $('#personTitle').val('');
    $('#personTitle').attr('placeholder', 'Title');
    $('#personFirstName').val('');
    $('#personMiddleName').val('');
    $('#personMiddleName').attr('placeholder', 'Middle Name');
    $('#personLastName').val('');
    $('#personSuffix').val('');
    $('#personSuffix').attr('placeholder', 'Suffix');
    $('#personEmailPromotion').val('');
    $('#personRowguid').val('');
    $('#personPersonType').removeClass('border border-danger');
    $('#personNameStyle').removeClass('border border-danger');
    $('#personFirstName').removeClass('border border-danger');
    $('#personLastName').removeClass('border border-danger');
    $('#personEmailPromotion').removeClass('border border-danger');
    $('#personRowguid').removeClass('border border-danger');

    $('#personTable tr').removeClass('text-primary');

    $('#personID').val('');
    $('#personDeleteID').val('');
    $('#personSave').text('Save');
};

//--------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------

//ContactType Form Model
function ContactTypeModel() {
    let ContactTypeID = "", Name = "", OperationType = "";
}

//ContactType GET
$(document).ready(function () {
    $("#contactTypeTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            contactTypeReset();
        },
        "ajax": {
            "url": "/Person/GetContactType",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "ContactTypeID" },
            { "data": "Name" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "ContactTypeID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowContactType(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=contactTypeConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//ContactType Edit Button
function editRowContactType(data) {
    $('#contactTypeSave').text('Update');

    $('#contactTypeTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#contactTypeName').removeClass('border border-danger');
    });

    $('#contactTypeTable tbody').on('click', 'button', function () {
        let table = $('#contactTypeTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#contactTypeName').val(row.Name);
        $('#contactTypeID').val(data);
    });
}

//ContactType Validate
function validateContactType() {
    let val = true;

    if ($("#contactTypeName").val() == "") {
        $("#contactTypeName").addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#contactTypeAlert").show('fade');
        setTimeout(function () { $("#contactTypeAlert").hide('fade'); }, 7000);
    }

    return val;
}

//ContactType Save
$('#contactTypeSave').click(function () {
    if (validateContactType()) {
        contactTypePOST();
    }
});

//ContactType POST
function contactTypePOST() {

    let viewModel = new ContactTypeModel();
    viewModel.ContactTypeID = $('#contactTypeID').val();
    viewModel.Name = $('#contactTypeName').val();
    viewModel.OperationType = $('#contactTypeSave').text();

    let ljson = JSON.stringify({ CT: viewModel });

    $.ajax({
        url: '/Person/PostContactType',
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
                contactTypeReset();
            }
        },
        success: function () {
            $.unblockUI();
            contactTypePostSuccess();
            $('#contactTypeTable').DataTable().ajax.reload();
            contactTypeReset();
        }
    });
}

//ContactType POST - Success
function contactTypePostSuccess() {
    $('#contactTypeSuccess').show('fade');
    setTimeout(function () { $('#contactTypeSuccess').hide('fade'); }, 6000);
}

//ContactType DELETE
function contactTypeConfirm(data) {
    $('#contactTypeModal').modal('show');
    $('#contactTypeDeleteID').val(data);
}
function contactTypeDelete() {
    let id = $('#contactTypeDeleteID').val();
    $('#contactTypeID').val(id)
    $('#contactTypeSave').text('Delete');
    contactTypePOST();
}

//ContactType Form - Remove red border as user type
$("#contactTypeName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//ContactType Reset
$("#contactTypeReset").click(function () {
    contactTypeReset();
});
function contactTypeReset() {
    $('#contactTypeName').val('');
    $('#contactTypeName').removeClass('border border-danger');

    $('#contactTypeTable tr').removeClass('text-primary');

    $('#contactTypeID').val('');
    $('#contactTypeDeleteID').val('');
    $('#contactTypeSave').text('Save');
};

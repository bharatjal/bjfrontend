  <form className="needs-validation" novalidate>
<div className="form-row">
  <div className="col-md-4 mb-3">
    <label for="validationCustom01">First name</label>
    <input type="text" className="form-control" id="validationCustom01" placeholder="First name" value="Mark" required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4 mb-3">
    <label for="validationCustom02">Last name</label>
    <input type="text" className="form-control" id="validationCustom02" placeholder="Last name" value="Otto" required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4 mb-3">
    <label for="validationCustomUsername">Username</label>
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroupPrepend">@</span>
      </div>
      <input type="text" className="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend" required/>
      <div className="invalid-feedback">
        Please choose a username.
      </div>
    </div>
  </div>
</div>
<div className="form-row">
  <div className="col-md-6 mb-3">
    <label for="validationCustom03">City</label>
    <input type="text" className="form-control" id="validationCustom03" placeholder="City" required/>
    <div className="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>
  <div className="col-md-3 mb-3">
    <label for="validationCustom04">State</label>
    <input type="text" className="form-control" id="validationCustom04" placeholder="State" required/>
    <div className="invalid-feedback">
      Please provide a valid state.
    </div>
  </div>
  <div className="col-md-3 mb-3">
    <label for="validationCustom05">Zip</label>
    <input type="text" className="form-control" id="validationCustom05" placeholder="Zip" required/>
    <div className="invalid-feedback">
      Please provide a valid zip.
    </div>
  </div>
</div>
<div className="form-group">
  <div className="form-check">
    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
    <label className="form-check-label" for="invalidCheck">
      Agree to terms and conditions
    </label>
    <div className="invalid-feedback">
      You must agree before submitting.
    </div>
  </div>
</div>
<button className="btn btn-primary" type="submit">Submit form</button>
</form>

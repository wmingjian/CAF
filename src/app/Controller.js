/*global CAF */

/**
 * MVC base. Controller
 * @author RobinQu
 * @version 0.1
 * @extends CAF.Object
 */

CAF.Controller = CAF.extend(CAF.Object, {
	isEditable : true,
	allowMultipleContent: false,
	content: null
});
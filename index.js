(function($, window, document, undefined) {
  'use strict';

  $.fn.flyout = function(parameters) {
    var
      query = arguments[0],
      response;

    this.each(function() {
      var
        options = $.extend(true, {}, $.fn.flyout.options, parameters),
        $instance = $(this),
        namespace = options.namespace,
        instance = $instance.data(namespace),
        module;

      module = {
        init: function(options) {
          instance = module;
          instance.options = options;
          instance.debug('Initializing instance with options', options);
          instance.bind.events();
          $instance.data(namespace, instance);
        },

        debug: function() {
          if (instance.options.debug) {
            var debug = Function.prototype.bind.call(
              console.log, console, '[' + instance.options.namespace + ']'
            );
            debug.apply(console, arguments);
          }
        },

        is: {
          opened: function() {
            return $instance.hasClass(instance.options.className.opened);
          },

          closed: function() {
            return !instance.is.opened();
          }
        },

        open: function() {
          module.debug('Opening flyout');
          if (instance.is.closed()) {
            $instance
              .addClass(instance.options.className.opened)
              .removeClass(instance.options.className.closed);
          }
        },

        close: function() {
          module.debug('Closing flyout');
          if (instance.is.opened()) {
            $instance
              .addClass(instance.options.className.closed)
              .removeClass(instance.options.className.opened);
          }
        },

        toggle: function() {
          if (instance.is.opened()) {
            instance.close();
          }

          else {
            instance.open();
          }
        },

        bind: {
          events: function() {
            instance.debug('Binding events');

            if (instance.options.trigger.open) {
              $(instance.options.trigger.open)
                .on('click', module.event.open);
            }

            if (instance.options.trigger.close) {
              $(instance.options.trigger.close)
                .on('click', module.event.close);
            }

            if (instance.options.trigger.toggle) {
              $(instance.options.trigger.toggle)
                .on('click', module.event.toggle);
            }
          }
        },

        event: {
          open: function(event) {
            instance.open();
            event.preventDefault();
          },

          close: function(event) {
            instance.close();
            event.preventDefault();
          },

          toggle: function(event) {
            instance.toggle();
            event.preventDefault();
          }
        },

        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            context = context || module,
            maxDepth,
            response,
            found;

          if (typeof query === 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;

            $.each(query, function(depth, value) {
              if ($.isPlainObject(object[value]) && (depth != maxDepth)) {
                object = object[value];
              }
              else if (object[value] !== undefined) {
                found = object[value];
                return false;
              }
              else {
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          }
          else if (found !== undefined) {
            response = found;
          }

          return response;
        }
      };

      if (instance === undefined) {
        module.init(options);
      }
      response = instance.invoke(query);
    });

    return (response !== undefined)
      ? response
      : this;
  };


  $.fn.flyout.options = {
    namespace: 'flyout',
    debug: false,

    className: {
      opened: 'is-opened',
      closed: false
    },

    trigger: {
      open: false,
      close: false,
      toggle: false
    }
  };

}(jQuery, window, document));
